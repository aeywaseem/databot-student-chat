
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { Key } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

interface GeminiKeyInputProps {
  onKeySubmit: (key: string) => void;
  apiKey: string | null;
}

const GeminiKeyInput: React.FC<GeminiKeyInputProps> = ({ onKeySubmit, apiKey }) => {
  const [key, setKey] = useState(apiKey || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!key.trim()) {
      toast.error("Please enter your Gemini API key");
      return;
    }
    
    setIsSubmitting(true);
    
    // Validate the API key format (basic validation)
    if (!key.startsWith('AI') || key.length < 10) {
      toast.error("Invalid API key format. Please check your key.");
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Save API key to localStorage
      localStorage.setItem('gemini_api_key', key);
      
      // If user is logged in, also save to their profile in Supabase
      if (user) {
        const { error } = await supabase
          .from('profiles')
          .update({ gemini_api_key: key })
          .eq('id', user.id);
          
        if (error) throw error;
      }
      
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

  // Load API key from user profile when they login
  useEffect(() => {
    const loadApiKey = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('gemini_api_key')
          .eq('id', user.id)
          .single();
          
        if (!error && data?.gemini_api_key) {
          setKey(data.gemini_api_key);
          localStorage.setItem('gemini_api_key', data.gemini_api_key);
          onKeySubmit(data.gemini_api_key);
        }
      }
    };
    
    loadApiKey();
  }, [user, onKeySubmit]);

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
              placeholder="Enter your Gemini API key"
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
        Your API key is stored locally on your device and in your secure user profile.
      </CardFooter>
    </Card>
  );
};

export default GeminiKeyInput;
