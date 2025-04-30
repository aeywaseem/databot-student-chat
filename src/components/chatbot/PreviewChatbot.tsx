
import React from 'react';

interface PreviewChatbotProps {
  pdfFile: File | null;
  config: {
    name: string;
    welcomeMessage: string;
    primaryColor: string;
    botIcon: string;
  };
}

const PreviewChatbot: React.FC<PreviewChatbotProps> = ({ pdfFile, config }) => {
  const botName = config.name || "AI Assistant";
  const primaryColor = config.primaryColor;
  const botIcon = config.botIcon;
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Preview & Publish</h2>
      <p className="text-gray-600 mb-6">
        Review how your chatbot will appear to your customers, then publish it when you're ready.
      </p>
      
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 max-w-md mx-auto overflow-hidden">
        {/* Chatbot header */}
        <div 
          className="p-4 flex items-center" 
          style={{ backgroundColor: primaryColor }}
        >
          <div className="text-2xl mr-3">{botIcon}</div>
          <div>
            <h3 className="font-medium text-white">{botName}</h3>
            <p className="text-xs text-white opacity-80">Powered by Databotics</p>
          </div>
        </div>
        
        {/* Chatbot messages */}
        <div className="p-4 h-80 overflow-y-auto bg-gray-50 flex flex-col space-y-3">
          <div className="flex items-start max-w-[80%]">
            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
              <p className="text-sm">{config.welcomeMessage}</p>
            </div>
          </div>
          
          <div className="flex items-start max-w-[80%] self-end">
            <div className="bg-blue-100 rounded-lg p-3 shadow-sm">
              <p className="text-sm">Can you tell me about your product?</p>
            </div>
          </div>
          
          <div className="flex items-start max-w-[80%]">
            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
              <p className="text-sm">
                Based on the PDF you've uploaded, I can answer questions about your product's features, pricing, and usage instructions.
              </p>
            </div>
          </div>
        </div>
        
        {/* Chatbot input */}
        <div className="p-3 border-t border-gray-200">
          <div className="flex">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 border rounded-l-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-databot-purple"
              disabled
            />
            <button
              className="rounded-r-md px-4 py-2 text-white"
              style={{ backgroundColor: primaryColor }}
              disabled
            >
              Send
            </button>
          </div>
        </div>
      </div>
      
      <div className="space-y-4 max-w-md mx-auto mt-8">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium">PDF Uploaded</h3>
          <p className="text-sm text-gray-600">{pdfFile?.name}</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <h3 className="font-medium">Chatbot Settings</h3>
          <div className="grid grid-cols-2 text-sm">
            <span className="text-gray-600">Name:</span>
            <span>{botName}</span>
            
            <span className="text-gray-600">Primary Color:</span>
            <div className="flex items-center">
              <div 
                className="w-4 h-4 rounded-full mr-2" 
                style={{ backgroundColor: primaryColor }}
              ></div>
              {primaryColor}
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium">Embedding Instructions</h3>
          <p className="text-sm text-gray-600 mb-2">
            After publishing, you'll receive code to embed your chatbot on your website.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PreviewChatbot;
