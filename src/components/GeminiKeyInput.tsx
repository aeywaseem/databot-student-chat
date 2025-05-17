
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { Key } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';

interface GeminiKeyInputProps {
  onKeySubmit: (key: string) => void;
  apiKey: string | null;
}

const GeminiKeyInput: React.FC<GeminiKeyInputProps> = ({ onKeySubmit, apiKey }) => {
  const [key, setKey] = useState(apiKey || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!key.trim()) {
      toast.error("Please enter your Gemini API key");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Save API key to localStorage only
      localStorage.setItem('gemini_api_key', key);
      
      // Call the onKeySubmit callback
      onKeySubmit(key);
      toast.success("API key saved successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to save API key");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openGeminiApiPage = () => {
    window.open('https://aistudio.google.com/app/apikey', '_blank');
  };

  // Load API key from localStorage when component mounts
  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      setKey(savedKey);
      onKeySubmit(savedKey);
    }
  }, [onKeySubmit]);

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle>Set Up Your Gemini API Key</CardTitle>
        <CardDescription>
          To use the AI chatbot, you'll need to provide your own Gemini API key
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <Button 
              type="button" 
              onClick={openGeminiApiPage}
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
            >
              <Key size={18} />
              Generate Gemini API Key
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Enter your API key</span>
              </div>
            </div>
            
            <Input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Enter your Gemini API key (e.g., AIzaSyBA6On4KtZJp9W2FMal7POHQ-r3_KoaArI)"
              className="w-full"
              required
            />
          </div>
          <Button 
            type="submit" 
            className="gradient-bg w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Validating..." : "Save API Key"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-xs text-gray-500">
        Your API key is stored locally on your device only.
      </CardFooter>
    </Card>
  );
}

export default GeminiKeyInput;
