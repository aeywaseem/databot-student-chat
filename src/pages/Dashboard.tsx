
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const hasChatbot = false; // This would be determined by an API call in a real app
  
  const createNewChatbot = () => {
    navigate('/create-chatbot');
  };
  
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        {!hasChatbot && (
          <Button onClick={createNewChatbot} className="gradient-bg">
            Create Chatbot
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Start Guide</CardTitle>
            <CardDescription>
              Learn how to create your first chatbot
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-databot-purple text-white rounded-full text-sm">1</span>
                <span>Upload your PDF document</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-databot-purple text-white rounded-full text-sm">2</span>
                <span>Customize your chatbot</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-databot-purple text-white rounded-full text-sm">3</span>
                <span>Publish and share with customers</span>
              </li>
            </ul>
            <Button onClick={createNewChatbot} className="w-full mt-4" variant="outline">
              Start Now
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Documentation</CardTitle>
            <CardDescription>
              Helpful resources for getting started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-blue-600">
              <li>
                <a href="#" className="hover:underline">How to create effective chatbots</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Advanced customization options</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Embedding your chatbot</a>
              </li>
              <li>
                <a href="#" className="hover:underline">API documentation</a>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Support</CardTitle>
            <CardDescription>
              Get help when you need it
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Our support team is available 24/7 to help you with any questions or issues.</p>
            <Button 
              onClick={() => toast.success("Support request submitted. We'll get back to you soon!")}
              variant="outline"
              className="w-full"
            >
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
