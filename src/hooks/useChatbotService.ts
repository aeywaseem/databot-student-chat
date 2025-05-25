
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { chatbotService, type Chatbot } from '@/services/chatbotService';
import { toast } from '@/components/ui/sonner';

export const useChatbotService = () => {
  const queryClient = useQueryClient();

  const chatbotsQuery = useQuery({
    queryKey: ['chatbots'],
    queryFn: () => chatbotService.getChatbots(),
  });

  const createChatbotMutation = useMutation({
    mutationFn: chatbotService.createChatbot,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatbots'] });
      toast.success('Chatbot created successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create chatbot');
    },
  });

  const updateChatbotMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Chatbot> }) =>
      chatbotService.updateChatbot(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatbots'] });
      toast.success('Chatbot updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update chatbot');
    },
  });

  const deleteChatbotMutation = useMutation({
    mutationFn: chatbotService.deleteChatbot,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatbots'] });
      toast.success('Chatbot deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete chatbot');
    },
  });

  const uploadDocumentMutation = useMutation({
    mutationFn: ({ chatbotId, file }: { chatbotId: string; file: File }) =>
      chatbotService.uploadDocument(chatbotId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatbots'] });
      toast.success('Document uploaded successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to upload document');
    },
  });

  return {
    chatbots: chatbotsQuery.data || [],
    isLoading: chatbotsQuery.isLoading,
    createChatbot: createChatbotMutation.mutate,
    updateChatbot: updateChatbotMutation.mutate,
    deleteChatbot: deleteChatbotMutation.mutate,
    uploadDocument: uploadDocumentMutation.mutate,
    isCreating: createChatbotMutation.isPending,
    isUpdating: updateChatbotMutation.isPending,
    isDeleting: deleteChatbotMutation.isPending,
    isUploading: uploadDocumentMutation.isPending,
  };
};
