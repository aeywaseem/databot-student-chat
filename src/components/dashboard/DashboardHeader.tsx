
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Key } from "lucide-react";

interface DashboardHeaderProps {
  title: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title }) => {
  const navigate = useNavigate();

  const createNewChatbot = () => {
    navigate('/create-chatbot');
  };

  const openGeminiApiPage = () => {
    window.open('https://aistudio.google.com/app/apikey', '_blank');
  };

  return (
    <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
      <h1 className="text-3xl font-bold">{title}</h1>
      <div className="flex flex-wrap gap-3">
        <Button onClick={openGeminiApiPage} variant="outline" className="flex items-center gap-2">
          <Key size={18} />
          Generate API Key
        </Button>
        <Button onClick={createNewChatbot} className="gradient-bg">
          Create New Chatbot
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
