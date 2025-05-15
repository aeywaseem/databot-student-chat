
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DashboardGuidesProps {
  apiKey: string | null;
  onChangeApiKey: () => void;
  showProcessingIndicator: boolean;
}

const DashboardGuides: React.FC<DashboardGuidesProps> = ({ 
  apiKey, 
  onChangeApiKey, 
  showProcessingIndicator 
}) => {
  return (
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
              onClick={onChangeApiKey}
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
  );
};

export default DashboardGuides;
