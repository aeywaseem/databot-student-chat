
import { supabase } from '@/lib/supabase';

export interface Chatbot {
  id: string;
  user_id: string;
  name: string;
  welcome_message: string;
  primary_color: string;
  bot_icon: string;
  status: 'active' | 'inactive' | 'processing';
  created_at: string;
  updated_at: string;
  documents?: Document[];
}

export interface Document {
  id: string;
  chatbot_id: string;
  user_id: string;
  file_name: string;
  file_size: number;
  content_type: string;
  processing_status: 'pending' | 'processing' | 'completed' | 'failed';
  storage_path?: string;
  created_at: string;
  updated_at: string;
}

export const chatbotService = {
  async createChatbot(data: Omit<Chatbot, 'id' | 'user_id' | 'created_at' | 'updated_at'>) {
    const { data: chatbot, error } = await supabase
      .from('chatbots')
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return chatbot;
  },

  async getChatbots() {
    const { data, error } = await supabase
      .from('chatbots')
      .select(`
        *,
        documents (*)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Chatbot[];
  },

  async getChatbot(id: string) {
    const { data, error } = await supabase
      .from('chatbots')
      .select(`
        *,
        documents (*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Chatbot;
  },

  async updateChatbot(id: string, data: Partial<Chatbot>) {
    const { data: chatbot, error } = await supabase
      .from('chatbots')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return chatbot;
  },

  async deleteChatbot(id: string) {
    const { error } = await supabase
      .from('chatbots')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async uploadDocument(chatbotId: string, file: File) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${chatbotId}/${fileName}`;

    // Upload file to storage
    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // Save document metadata
    const { data, error } = await supabase
      .from('documents')
      .insert([{
        chatbot_id: chatbotId,
        file_name: file.name,
        file_size: file.size,
        content_type: file.type,
        storage_path: filePath,
        processing_status: 'pending'
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
