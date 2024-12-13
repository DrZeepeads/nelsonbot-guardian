import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { sendMessage } from "@/services/gradioService";
import MessageList from "./chat/MessageList";
import SuggestionList from "./chat/SuggestionList";
import ChatInput from "./chat/ChatInput";

interface ChatMessage {
  text: string;
  isUser: boolean;
}

export const ChatInterface = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const suggestions = [
    "What are common symptoms of pediatric fever?",
    "How to handle infant vaccination schedules?",
    "Signs of respiratory distress in children",
    "Common childhood allergies and treatments",
  ];

  const handleSend = async () => {
    if (!message.trim()) return;
    
    setIsLoading(true);
    const userMessage = message.trim();
    setMessage("");
    
    setMessages(prev => [...prev, { text: userMessage, isUser: true }]);

    try {
      console.log("Sending message to Gradio:", userMessage);
      const response = await sendMessage(userMessage);
      
      setMessages(prev => [...prev, { text: response, isUser: false }]);
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get response. Please try again.",
        variant: "destructive",
      });
      
      setMessages(prev => [...prev, { 
        text: "I apologize, but I'm having trouble connecting to the medical knowledge base. Please try again in a moment.", 
        isUser: false 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center justify-center space-y-6 p-4">
        <div className="w-24 h-24 bg-medical-accent rounded-full flex items-center justify-center">
          <span className="text-4xl">👶</span>
        </div>
        
        <h2 className="text-2xl font-semibold text-medical-primary text-center">
          Welcome to NelsonBot
        </h2>
        
        <p className="text-gray-600 text-center max-w-md">
          Your AI assistant for pediatric insights, powered by the Nelson Textbook of Pediatrics
        </p>
        
        <MessageList messages={messages} />
        
        <SuggestionList 
          suggestions={suggestions} 
          onSuggestionClick={setMessage} 
        />
      </div>

      <ChatInput
        message={message}
        isLoading={isLoading}
        onMessageChange={setMessage}
        onSend={handleSend}
      />
    </div>
  );
};

export default ChatInterface;