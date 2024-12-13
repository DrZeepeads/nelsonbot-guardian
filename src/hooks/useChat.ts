import { useState, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { llamaApi } from '@/services/llamaApi';

interface Message {
  text: string;
  isUser: boolean;
}

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sendChatMessage = useCallback(async (message: string) => {
    if (!message.trim()) return;

    setIsLoading(true);
    setMessages(prev => [...prev, { text: message, isUser: true }]);

    try {
      console.log('Sending message:', message);
      const response = await llamaApi.generateResponse(message);
      console.log('Received response:', response);

      setMessages(prev => [...prev, { text: response, isUser: false }]);
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Connection Issue",
        description: "Having trouble connecting to the chat service. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  return {
    messages,
    isLoading,
    sendMessage: sendChatMessage
  };
};