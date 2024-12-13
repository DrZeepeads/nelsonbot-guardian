import { useState } from "react";
import { Mic, Send, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { sendMessage } from "@/services/gradioService";

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
    
    // Add user message to chat
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
      
      // Add error message to chat
      setMessages(prev => [...prev, { 
        text: "I apologize, but I'm having trouble connecting to the medical knowledge base. Please try again in a moment.", 
        isUser: false 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
  };

  return (
    <div className="flex flex-col h-screen pt-16 pb-4">
      {/* Logo and Welcome Section */}
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
        
        {/* Chat Messages */}
        <div className="w-full max-w-2xl space-y-4 overflow-y-auto px-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                msg.isUser
                  ? "bg-medical-primary text-white ml-auto"
                  : "bg-medical-accent text-medical-primary"
              } max-w-[80%] ${msg.isUser ? "ml-auto" : "mr-auto"} shadow-sm`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        
        {/* Suggestions */}
        <div className="flex flex-wrap justify-center gap-2 max-w-md px-4">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              className="bg-medical-accent text-medical-primary px-4 py-2 rounded-full text-sm hover:bg-medical-secondary hover:text-white transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="px-4">
        <div className="bg-white border border-gray-200 rounded-lg flex items-center gap-2 p-2 shadow-sm">
          <Button variant="ghost" size="icon">
            <Plus className="h-5 w-5 text-gray-500" />
          </Button>
          
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your medical query..."
            className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            disabled={isLoading}
          />
          
          <Button variant="ghost" size="icon">
            <Mic className="h-5 w-5 text-gray-500" />
          </Button>
          
          <Button 
            onClick={handleSend}
            disabled={!message.trim() || isLoading}
            className="bg-medical-primary hover:bg-medical-primary/90"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;