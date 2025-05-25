
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
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
    handleUploadPDF
  } = useChatbot();
  
  const showUploadSection = !isUploading && !pdfId;
  const showChatInterface = pdfId && chatbotReady;
  
  return (
    <DashboardLayout>
      <DashboardHeader title="Dashboard" />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {showUploadSection ? (
            <UploadSection 
              pdfFile={pdfFile}
              setPdfFile={setPdfFile}
              handleUploadPDF={handleUploadPDF}
              isUploading={isUploading}
              uploadProgress={uploadProgress}
            />
          ) : (
            <ChatInterface 
              apiKey={apiKey} 
              pdfId={pdfId} 
              isReady={chatbotReady} 
            />
          )}
        </div>
        
        <div>
          <DashboardGuides 
            apiKey={apiKey}
            onChangeApiKey={() => {}} // No longer needed
            showProcessingIndicator={false}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
