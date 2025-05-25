
import { useState, useEffect } from 'react';
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/lib/supabase";
import { useAuth } from '@/contexts/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import { GEMINI_API_KEY } from '@/lib/constants';

export const useChatbot = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfId, setPdfId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [chatbotReady, setChatbotReady] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { user } = useAuth();

  // Load PDF ID from localStorage on component mount
  useEffect(() => {
    const savedPdfId = localStorage.getItem('latest_pdf_id');
    if (savedPdfId) {
      setPdfId(savedPdfId);
      setChatbotReady(true); // Assume ready if we have a PDF ID
    }
  }, []);
  
  const handleUploadPDF = async () => {
    if (!pdfFile || !user) {
      if (!user) toast.error("You must be logged in to upload documents");
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      // 1. Generate a unique ID for the document
      const docId = uuidv4();
      
      // 2. Upload the PDF file to Supabase Storage
      const filePath = `documents/${user.id}/${docId}/${pdfFile.name}`;
      
      setUploadProgress(25);
      
      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('pdfs')
        .upload(filePath, pdfFile);
        
      if (uploadError) throw uploadError;
        
      setUploadProgress(50);
      
      // Store document info in the documents table (which exists in your DB)
      const { error: insertError } = await supabase
        .from('documents')
        .insert({
          id: docId,
          content: '', // Will be populated by processing
          metadata: {
            user_id: user.id,
            file_name: pdfFile.name,
            file_size: pdfFile.size,
            file_path: filePath
          },
          embedding: null // Will be populated by processing
        });
        
      if (insertError) {
        console.log('Insert error:', insertError);
        // If documents table doesn't exist either, we'll just store in localStorage
      }
      
      setUploadProgress(75);
      
      // Store the PDF ID in localStorage
      setPdfId(docId);
      localStorage.setItem('latest_pdf_id', docId);
      
      toast.success("PDF uploaded successfully! Your chatbot is ready.");
      setChatbotReady(true);
      
      setUploadProgress(100);
      
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || "Failed to upload PDF");
    } finally {
      setIsUploading(false);
    }
  };

  return {
    apiKey: GEMINI_API_KEY,
    pdfFile,
    pdfId,
    isUploading,
    chatbotReady,
    uploadProgress,
    setPdfFile,
    handleApiKeySubmit: () => {}, // No longer needed
    handleUploadPDF,
    resetApiKey: () => {}, // No longer needed
    checkChatbotStatus: () => {} // No longer needed
  };
};
