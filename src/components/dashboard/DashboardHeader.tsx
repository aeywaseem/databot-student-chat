
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  title: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title }) => {
  const navigate = useNavigate();

  const createNewChatbot = () => {
    navigate('/create-chatbot');
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-bold">{title}</h1>
      <Button onClick={createNewChatbot} className="gradient-bg">
        Create New Chatbot
      </Button>
    </div>
  );
};

export default DashboardHeader;
