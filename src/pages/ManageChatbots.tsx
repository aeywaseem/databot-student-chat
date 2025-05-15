
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash, Edit } from "lucide-react";

const ManageChatbots: React.FC = () => {
  const [chatbots, setChatbots] = useState([
    {
      id: '1',
      name: 'Product Manual Bot',
      documentName: 'product-manual.pdf',
      createdAt: '2025-04-15',
      status: 'active',
    },
    {
      id: '2',
      name: 'Employee Handbook Bot',
      documentName: 'employee-handbook.pdf',
      createdAt: '2025-05-01',
      status: 'active',
    },
    {
      id: '3',
      name: 'Sales Guide Bot',
      documentName: 'sales-guide.pdf',
      createdAt: '2025-05-10',
      status: 'processing',
    }
  ]);
  
  const handleDeleteChatbot = (id: string) => {
    setChatbots(chatbots.filter(chatbot => chatbot.id !== id));
  };
  
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Manage Chatbots</h1>
        <Button className="gradient-bg">
          Create New Chatbot
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {chatbots.map((chatbot) => (
          <Card key={chatbot.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle>{chatbot.name}</CardTitle>
                <CardDescription>Created on {chatbot.createdAt}</CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteChatbot(chatbot.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                  <p className="text-sm text-gray-500">Document: {chatbot.documentName}</p>
                  <div className="flex items-center mt-1">
                    <div className={`h-2 w-2 rounded-full mr-2 ${
                      chatbot.status === 'active' ? 'bg-green-500' : 'bg-amber-500'
                    }`}></div>
                    <p className="text-sm text-gray-500 capitalize">{chatbot.status}</p>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0">
                  <Button className="gradient-bg">
                    Open Chat
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default ManageChatbots;
