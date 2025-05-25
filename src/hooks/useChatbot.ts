
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

  // Helper function to convert ArrayBuffer to base64 safely
  const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    const chunkSize = 8192; // Process in chunks to avoid stack overflow
    
    for (let i = 0; i < bytes.length; i += chunkSize) {
      const chunk = bytes.slice(i, i + chunkSize);
      binary += String.fromCharCode.apply(null, Array.from(chunk));
    }
    
    return btoa(binary);
  };
  
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
      
      setUploadProgress(25);
      
      // 2. Read the PDF file content safely
      const fileContent = await pdfFile.arrayBuffer();
      const base64Content = arrayBufferToBase64(fileContent);
      
      setUploadProgress(50);
      
      // 3. Store document info with content in localStorage for now
      // In a real implementation, this would go to your vector database
      const documentData = {
        id: docId,
        user_id: user.id,
        file_name: pdfFile.name,
        file_size: pdfFile.size,
        content: base64Content,
        created_at: new Date().toISOString()
      };
      
      localStorage.setItem(`document_${docId}`, JSON.stringify(documentData));
      
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
