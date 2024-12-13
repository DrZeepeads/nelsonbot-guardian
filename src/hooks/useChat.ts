import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
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

      if (response) {
        setMessages(prev => [...prev, { text: response, isUser: false }]);
      } else {
        throw new Error('Empty response received');
      }
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Connection Issue",
        description: "Having trouble connecting to the chat service. Using fallback responses.",
        variant: "destructive",
      });
      
      // Add a fallback response even when there's an error
      setMessages(prev => [...prev, { 
        text: "I apologize, but I'm having trouble connecting right now. I'll provide general pediatric information based on my knowledge base.",
        isUser: false 
      }]);
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