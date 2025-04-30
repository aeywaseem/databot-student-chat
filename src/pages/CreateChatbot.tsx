
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Steps } from '@/components/Steps';
import { toast } from "@/components/ui/sonner";
import UploadPDF from '@/components/chatbot/UploadPDF';
import CustomizeChatbot from '@/components/chatbot/CustomizeChatbot';
import PreviewChatbot from '@/components/chatbot/PreviewChatbot';

const CreateChatbot: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [chatbotConfig, setChatbotConfig] = useState({
    name: '',
    welcomeMessage: 'Hello! I can answer questions based on the uploaded PDF. How can I help you today?',
    primaryColor: '#805ad5',
    botIcon: '🤖',
  });
  
  const steps = [
    { id: 'upload', name: 'Upload PDF' },
    { id: 'customize', name: 'Customize Chatbot' },
    { id: 'preview', name: 'Preview & Publish' },
  ];

  const handleNext = () => {
    if (currentStep === 0 && !pdfFile) {
      toast.error("Please upload a PDF file first");
      return;
    }
    
    if (currentStep === 1 && !chatbotConfig.name) {
      toast.error("Please give your chatbot a name");
      return;
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePublish = () => {
    // In a real app, this would make an API call to publish the chatbot
    toast.success("Chatbot published successfully!");
    navigate('/dashboard');
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Create Your Chatbot</h1>
      
      <Steps steps={steps} currentStep={currentStep} />
      
      <Card className="p-6 mt-6">
        {currentStep === 0 && (
          <UploadPDF 
            pdfFile={pdfFile} 
            setPdfFile={setPdfFile} 
          />
        )}
        
        {currentStep === 1 && (
          <CustomizeChatbot 
            config={chatbotConfig} 
            setConfig={setChatbotConfig} 
          />
        )}
        
        {currentStep === 2 && (
          <PreviewChatbot 
            pdfFile={pdfFile} 
            config={chatbotConfig}
          />
        )}
        
        <div className="flex justify-between mt-6">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            variant="outline"
          >
            Previous
          </Button>
          
          <div>
            {currentStep < steps.length - 1 ? (
              <Button onClick={handleNext} className="gradient-bg">
                Continue
              </Button>
            ) : (
              <Button onClick={handlePublish} className="gradient-bg">
                Publish Chatbot
              </Button>
            )}
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default CreateChatbot;
