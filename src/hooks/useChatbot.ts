import { useState, useEffect } from 'react';
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/lib/supabase";
import { useAuth } from '@/contexts/AuthContext';
import { v4 as uuidv4 } from 'uuid';

export const useChatbot = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfId, setPdfId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [chatbotReady, setChatbotReady] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { user } = useAuth();

  // Load API key from localStorage on component mount
  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      setApiKey(savedKey);
    }
    
    const savedPdfId = localStorage.getItem('latest_pdf_id');
    if (savedPdfId) {
      setPdfId(savedPdfId);
      
      // Check if the chatbot is ready
      checkChatbotStatus(savedPdfId);
    }
  }, []);
  
  const checkChatbotStatus = async (id: string) => {
    try {
      // Check if the vector embedding process is complete
      const { data, error } = await supabase
        .from('pdf_documents')
        .select('processing_status')
        .eq('id', id)
        .single();
      
      if (error) {
        throw error;
      }
      
      const isReady = data?.processing_status === 'completed';
      setChatbotReady(isReady);
      
      // If not ready, check again in 30 seconds
      if (!isReady) {
        setTimeout(() => checkChatbotStatus(id), 10000);
      }
    } catch (error) {
      console.error('Error checking chatbot status:', error);
    }
  };
  
  const handleApiKeySubmit = (key: string) => {
    localStorage.setItem('gemini_api_key', key);
    setApiKey(key);
  };
  
  const handleUploadPDF = async () => {
    if (!pdfFile || !apiKey || !user) {
      if (!user) toast.error("You must be logged in to upload documents");
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      // 1. Generate a unique ID for the document
      const docId = uuidv4();
      
      // 2. Create a metadata record in the database
      const { error: metadataError } = await supabase
        .from('pdf_documents')
        .insert({
          id: docId,
          user_id: user.id,
          file_name: pdfFile.name,
          file_size: pdfFile.size,
          processing_status: 'uploading'
        });
        
      if (metadataError) throw metadataError;
        
      // 3. Upload the PDF file to Supabase Storage
      const filePath = `documents/${user.id}/${docId}/${pdfFile.name}`;
      
      setUploadProgress(25); // Start upload
      
      // Upload without progress tracking (Supabase doesn't support onUploadProgress)
      const { error: uploadError } = await supabase.storage
        .from('pdfs')
        .upload(filePath, pdfFile);
        
      if (uploadError) throw uploadError;
        
      // 4. Call an edge function to process the document and create vector embeddings
      setUploadProgress(50); // Upload complete, start processing
      
      // Update status to processing
      const { error: updateError } = await supabase
        .from('pdf_documents')
        .update({ processing_status: 'processing' })
        .eq('id', docId);
        
      if (updateError) throw updateError;
      
      // Invoke edge function to process document and create embeddings
      const { error: functionError } = await supabase.functions.invoke('process-document', {
        body: {
          docId: docId,
          userId: user.id,
          filePath: filePath,
          apiKey: apiKey
        }
      });
      
      if (functionError) throw functionError;
      
      // Store the PDF ID in localStorage
      setPdfId(docId);
      localStorage.setItem('latest_pdf_id', docId);
      
      toast.success("PDF uploaded successfully! Your chatbot is being prepared.");
      
      // Start checking for chatbot readiness
      setTimeout(() => checkChatbotStatus(docId), 10000);
      
      setUploadProgress(100);
      
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || "Failed to upload PDF");
    } finally {
      setIsUploading(false);
    }
  };

  const resetApiKey = () => {
    setApiKey(null);
    localStorage.removeItem('gemini_api_key');
  };

  return {
    apiKey,
    pdfFile,
    pdfId,
    isUploading,
    chatbotReady,
    uploadProgress,
    setPdfFile,
    handleApiKeySubmit,
    handleUploadPDF,
    resetApiKey,
    checkChatbotStatus
  };
};
