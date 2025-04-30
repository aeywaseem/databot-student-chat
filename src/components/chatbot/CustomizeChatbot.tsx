
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CustomizeChatbotProps {
  config: {
    name: string;
    welcomeMessage: string;
    primaryColor: string;
    botIcon: string;
  };
  setConfig: React.Dispatch<React.SetStateAction<{
    name: string;
    welcomeMessage: string;
    primaryColor: string;
    botIcon: string;
  }>>;
}

const CustomizeChatbot: React.FC<CustomizeChatbotProps> = ({ config, setConfig }) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setConfig({ ...config, [name]: value });
  };

  const iconOptions = ["🤖", "💬", "🤔", "🧠", "👩‍💼", "👨‍💼", "📚", "💡"];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold mb-4">Customize Your Chatbot</h2>
      <p className="text-gray-600 mb-6">
        Personalize how your chatbot looks and interacts with your customers.
      </p>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Chatbot Name</Label>
          <Input
            id="name"
            name="name"
            value={config.name}
            onChange={handleChange}
            placeholder="e.g., Support Assistant"
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="welcomeMessage">Welcome Message</Label>
          <Textarea
            id="welcomeMessage"
            name="welcomeMessage"
            value={config.welcomeMessage}
            onChange={handleChange}
            placeholder="How your chatbot greets users"
            rows={3}
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="primaryColor">Primary Color</Label>
          <div className="flex items-center mt-1">
            <Input
              type="color"
              id="primaryColor"
              name="primaryColor"
              value={config.primaryColor}
              onChange={handleChange}
              className="w-12 h-10 p-1"
            />
            <Input
              type="text"
              value={config.primaryColor}
              onChange={handleChange}
              name="primaryColor"
              className="ml-2"
            />
          </div>
        </div>
        
        <div>
          <Label>Bot Icon</Label>
          <div className="grid grid-cols-4 gap-4 mt-1">
            {iconOptions.map((icon) => (
              <div
                key={icon}
                className={`flex items-center justify-center h-12 w-12 rounded-md text-2xl cursor-pointer border ${
                  config.botIcon === icon ? 'border-databot-purple' : 'border-gray-200'
                }`}
                onClick={() => setConfig({ ...config, botIcon: icon })}
              >
                {icon}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeChatbot;
