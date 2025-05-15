
import { useState, useEffect } from 'react';
import { toast } from "@/components/ui/sonner";

export const useChatbot = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfId, setPdfId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [chatbotReady, setChatbotReady] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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
      // Call your backend to check if the chatbot is ready
      const response = await fetch(`https://your-fastapi-backend.com/chatbot-status/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to check chatbot status');
      }
      
      const data = await response.json();
      setChatbotReady(data.ready);
      
      // If not ready, check again in 30 seconds
      if (!data.ready) {
        setTimeout(() => checkChatbotStatus(id), 30000);
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
    if (!pdfFile || !apiKey) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Create form data for the file upload
    const formData = new FormData();
    formData.append('file', pdfFile);
    formData.append('api_key', apiKey);
    
    // Use XMLHttpRequest for progress tracking instead of fetch
    return new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      
      // Track upload progress
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentCompleted = Math.round((event.loaded * 100) / event.total);
          setUploadProgress(percentCompleted);
        }
      };
      
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data = JSON.parse(xhr.responseText);
            setPdfId(data.pdf_id);
            localStorage.setItem('latest_pdf_id', data.pdf_id);
            
            toast.success("PDF uploaded successfully! Your chatbot is being prepared.");
            
            // Start checking for chatbot readiness
            setTimeout(() => checkChatbotStatus(data.pdf_id), 30000);
            resolve();
          } catch (error) {
            console.error('Error parsing response:', error);
            toast.error("Failed to upload PDF. Please try again.");
            reject(error);
          }
        } else {
          console.error('Upload failed:', xhr.statusText);
          toast.error("Failed to upload PDF. Please try again.");
          reject(new Error(xhr.statusText));
        }
        setIsUploading(false);
      };
      
      xhr.onerror = () => {
        console.error('Upload request failed');
        toast.error("Failed to upload PDF. Please try again.");
        setIsUploading(false);
        reject(new Error('Network error'));
      };
      
      xhr.open('POST', 'https://your-fastapi-backend.com/upload-pdf/', true);
      xhr.send(formData);
    });
  };

  const resetApiKey = () => {
    setApiKey(null);
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
