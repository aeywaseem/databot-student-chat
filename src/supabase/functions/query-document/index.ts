
// query-document edge function
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { GoogleGenerativeAI } from 'https://esm.sh/@google/generative-ai@0.1.3';
import { GoogleGenerativeAIEmbeddings } from 'https://esm.sh/@langchain/google-genai@0.1.3';
import { SupabaseVectorStore } from 'https://esm.sh/langchain/vectorstores/supabase';

// Environment variables
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || '';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

serve(async (req) => {
  try {
    // Create Supabase client
    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    
    // Parse request body
    const { query, pdfId, apiKey, userId } = await req.json();
    
    if (!query || !pdfId || !apiKey || !userId) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Generate vector collection name for this user
    const collectionName = `user_${userId.replace(/-/g, '_')}`;
    
    // Initialize Google Gemini embeddings
    const embeddings = new GoogleGenerativeAIEmbeddings({ 
      apiKey, 
      modelName: 'embedding-001',
      dimensions: 768
    });
    
    // Create vector store instance
    const vectorStore = new SupabaseVectorStore(embeddings, {
      client: supabaseAdmin,
      tableName: collectionName,
      queryName: 'match_documents',
    });

    // Generate embedding for the query
    const queryEmbedding = await embeddings.embedQuery(query);
    
    // Search for similar documents
    const { data: results, error: searchError } = await supabaseAdmin.rpc(
      'match_documents',
      {
        query_embedding: queryEmbedding,
        match_threshold: 0.5,
        match_count: 5,
      }
    );
    
    if (searchError) throw searchError;

    // Filter results for this specific PDF
    const filteredResults = results.filter(
      (item: any) => item.metadata.pdf_id === pdfId
    );
    
    if (filteredResults.length === 0) {
      return new Response(
        JSON.stringify({ response: "I couldn't find information related to your question in this document." }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Extract relevant contexts
    const contexts = filteredResults.map((item: any) => item.content).join('\n\n');

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Generate a prompt
    const prompt = `
    You are an AI assistant that answers questions based on specific documents.
    Use ONLY the following context to answer the question. If the context doesn't 
    contain the information needed, say "I don't have information about that in this document."
    
    CONTEXT:
    ${contexts}
    
    QUESTION:
    ${query}
    
    ANSWER:
    `;

    // Generate response
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    // Store the conversation in the chat_messages table
    await supabaseAdmin.from('chat_messages').insert([
      {
        user_id: userId,
        pdf_id: pdfId,
        content: query,
        is_user_message: true
      },
      {
        user_id: userId,
        pdf_id: pdfId,
        content: response,
        is_user_message: false
      }
    ]);

    return new Response(
      JSON.stringify({ response }),
      { headers: { 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error querying document:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        response: "Sorry, I encountered an error while trying to answer your question."
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
