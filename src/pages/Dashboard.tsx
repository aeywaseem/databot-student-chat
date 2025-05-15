
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import GeminiKeyInput from '@/components/GeminiKeyInput';
import ChatInterface from '@/components/ChatInterface';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardGuides from '@/components/dashboard/DashboardGuides';
import UploadSection from '@/components/dashboard/UploadSection';
import { useChatbot } from '@/hooks/useChatbot';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const {
    apiKey,
    pdfFile,
    pdfId,
    isUploading,
    chatbotReady,
    uploadProgress,
    setPdfFile,
    handleApiKeySubmit,
    handleUploadPDF,
    resetApiKey
  } = useChatbot();
  
  const showUploadSection = apiKey && !isUploading && !pdfId;
  const showProcessingIndicator = pdfId && !chatbotReady;
  const showChatInterface = pdfId && chatbotReady;
  
  return (
    <DashboardLayout>
      <DashboardHeader title="Dashboard" />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {!apiKey ? (
            <GeminiKeyInput onKeySubmit={handleApiKeySubmit} apiKey={apiKey} />
          ) : showUploadSection ? (
            <UploadSection 
              pdfFile={pdfFile}
              setPdfFile={setPdfFile}
              handleUploadPDF={handleUploadPDF}
              isUploading={isUploading}
              uploadProgress={uploadProgress}
            />
          ) : (
            <ChatInterface 
              apiKey={apiKey || ''} 
              pdfId={pdfId} 
              isReady={chatbotReady} 
            />
          )}
        </div>
        
        <div>
          <DashboardGuides 
            apiKey={apiKey}
            onChangeApiKey={resetApiKey}
            showProcessingIndicator={showProcessingIndicator}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
