
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import GeminiKeyInput from '@/components/GeminiKeyInput';
import ChatInterface from '@/components/ChatInterface';
import UploadPDF from '@/components/chatbot/UploadPDF';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
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
    
    try {
      // Upload to your FastAPI backend
      const response = await fetch('https://your-fastapi-backend.com/upload-pdf/', {
        method: 'POST',
        body: formData,
        // Track upload progress
        onUploadProgress: (progressEvent: any) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload PDF');
      }
      
      const data = await response.json();
      setPdfId(data.pdf_id);
      localStorage.setItem('latest_pdf_id', data.pdf_id);
      
      toast.success("PDF uploaded successfully! Your chatbot is being prepared.");
      
      // Start checking for chatbot readiness
      setTimeout(() => checkChatbotStatus(data.pdf_id), 30000);
    } catch (error) {
      console.error('Error uploading PDF:', error);
      toast.error("Failed to upload PDF. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const createNewChatbot = () => {
    navigate('/create-chatbot');
  };
  
  const showUploadSection = apiKey && !isUploading && !pdfId;
  const showProcessingIndicator = pdfId && !chatbotReady;
  const showChatInterface = pdfId && chatbotReady;
  
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button onClick={createNewChatbot} className="gradient-bg">
          Create New Chatbot
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {!apiKey ? (
            <GeminiKeyInput onKeySubmit={handleApiKeySubmit} apiKey={apiKey} />
          ) : showUploadSection ? (
            <Card>
              <CardHeader>
                <CardTitle>Upload Your Document</CardTitle>
                <CardDescription>
                  Upload a PDF to create an AI chatbot that can answer questions about it
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <UploadPDF pdfFile={pdfFile} setPdfFile={setPdfFile} />
                  {pdfFile && (
                    <Button 
                      onClick={handleUploadPDF} 
                      className="w-full gradient-bg"
                      disabled={isUploading}
                    >
                      {isUploading ? `Uploading... ${uploadProgress}%` : "Process Document"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <ChatInterface 
              apiKey={apiKey || ''} 
              pdfId={pdfId} 
              isReady={chatbotReady} 
            />
          )}
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Guide</CardTitle>
              <CardDescription>
                How to use your document chatbot
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-databot-purple text-white rounded-full text-sm">1</span>
                  <span>Input your Gemini API key</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-databot-purple text-white rounded-full text-sm">2</span>
                  <span>Upload your PDF document</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-databot-purple text-white rounded-full text-sm">3</span>
                  <span>Wait 5-6 minutes for processing</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-databot-purple text-white rounded-full text-sm">4</span>
                  <span>Ask questions about your document</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          {apiKey && (
            <Card>
              <CardHeader>
                <CardTitle>API Key</CardTitle>
                <CardDescription>
                  Your Gemini API key is set
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  You can change your API key anytime by clicking the button below.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4 w-full"
                  onClick={() => setApiKey(null)}
                >
                  Change API Key
                </Button>
              </CardContent>
            </Card>
          )}
          
          {showProcessingIndicator && (
            <Card>
              <CardHeader>
                <CardTitle>Processing</CardTitle>
                <CardDescription>
                  Your document is being processed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-databot-purple h-2.5 rounded-full animate-pulse w-full"></div>
                  </div>
                  <p className="text-sm text-gray-500">
                    This typically takes 5-6 minutes. Your chatbot will be ready soon.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
