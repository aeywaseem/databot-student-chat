
// process-document edge function
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { GoogleGenerativeAI } from 'https://esm.sh/@google/generative-ai@0.1.3';
import { Document } from 'https://esm.sh/langchain/document';
import { RecursiveCharacterTextSplitter } from 'https://esm.sh/langchain/text_splitter';
import { SupabaseVectorStore } from 'https://esm.sh/langchain/vectorstores/supabase';
import { GoogleGenerativeAIEmbeddings } from 'https://esm.sh/@langchain/google-genai@0.1.3';

// Environment variables
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

serve(async (req) => {
  try {
    // Create Supabase client
    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    
    // Parse request body
    const { docId, userId, filePath, apiKey } = await req.json();
    
    if (!docId || !userId || !filePath || !apiKey) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Update document status to processing
    await supabaseAdmin
      .from('pdf_documents')
      .update({ processing_status: 'processing' })
      .eq('id', docId);

    // Download the PDF from storage
    const { data: fileData, error: downloadError } = await supabaseAdmin.storage
      .from('pdfs')
      .download(filePath);
      
    if (downloadError) throw downloadError;

    // Extract text from PDF
    const text = await extractTextFromPDF(fileData);
    
    // Split text into chunks
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    
    const chunks = await splitter.splitText(text);
    
    // Generate a unique collection name for this user
    const collectionName = `user_${userId.replace(/-/g, '_')}`;
    
    // Check if the collection exists, if not create it
    await createVectorCollection(supabaseAdmin, collectionName);
    
    // Create vector embeddings using Google's embedding model
    const embeddings = new GoogleGenerativeAIEmbeddings({ 
      apiKey, 
      modelName: 'embedding-001',
      dimensions: 768 // Ensure 768 dimensions
    });

    // Create metadata for each chunk
    const documents = chunks.map((chunk, i) => 
      new Document({
        pageContent: chunk,
        metadata: {
          pdf_id: docId,
          chunk_id: i,
          user_id: userId
        }
      })
    );

    // Store the vectors in Supabase
    await SupabaseVectorStore.fromDocuments(
      documents,
      embeddings,
      {
        client: supabaseAdmin,
        tableName: collectionName,
        queryName: 'match_documents',
      }
    );

    // Update document status to completed
    await supabaseAdmin
      .from('pdf_documents')
      .update({ processing_status: 'completed' })
      .eq('id', docId);

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error processing document:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});

// Helper functions
async function extractTextFromPDF(pdfBlob: Blob): Promise<string> {
  // This is a simplified placeholder for PDF text extraction
  // In a real implementation, you would use a PDF parsing library compatible with Deno
  
  // For now, just return placeholder text
  return "This is placeholder text. In a real implementation, you would extract text from the PDF file.";
}

async function createVectorCollection(supabase: any, collectionName: string): Promise<void> {
  // Check if the collection exists
  const { error: checkError } = await supabase.rpc(
    'check_table_exists',
    { table_name: collectionName }
  );
  
  // If table doesn't exist, create it
  if (checkError) {
    const query = `
      CREATE TABLE ${collectionName} (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        content TEXT NOT NULL,
        embedding VECTOR(768) NOT NULL,
        metadata JSONB NOT NULL DEFAULT '{}'::JSONB,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      
      -- Create a function to match documents
      CREATE OR REPLACE FUNCTION match_documents(
        query_embedding VECTOR(768),
        match_threshold FLOAT DEFAULT 0.7,
        match_count INT DEFAULT 5
      ) RETURNS TABLE (
        id UUID,
        content TEXT,
        metadata JSONB,
        similarity FLOAT
      ) LANGUAGE plpgsql AS $$
      BEGIN
        RETURN QUERY
        SELECT
          ${collectionName}.id,
          ${collectionName}.content,
          ${collectionName}.metadata,
          1 - (${collectionName}.embedding <=> query_embedding) AS similarity
        FROM ${collectionName}
        WHERE 1 - (${collectionName}.embedding <=> query_embedding) > match_threshold
        ORDER BY similarity DESC
        LIMIT match_count;
      END;
      $$;
      
      -- Enable Row Level Security
      ALTER TABLE ${collectionName} ENABLE ROW LEVEL SECURITY;
      
      -- Create policy for users to access only their vectors
      CREATE POLICY "${collectionName}_policy"
        ON ${collectionName}
        FOR ALL
        USING ((metadata->>'user_id')::UUID = auth.uid());
    `;
    
    await supabase.rpc('exec_sql', { sql: query });
  }
}
