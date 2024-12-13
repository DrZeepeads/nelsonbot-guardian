import { useState, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { llamaApi } from '@/services/llamaApi';
import { sendMessage } from '@/services/gradioService';

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
      let response: string;
      try {
        response = await sendMessage(message);
      } catch (error) {
        console.log('Falling back to LlamaAPI');
        response = await llamaApi.generateResponse(message);
      }

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