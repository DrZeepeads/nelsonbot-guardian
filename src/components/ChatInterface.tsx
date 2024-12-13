import { useChat } from "@/hooks/useChat";
import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MessageList from "./chat/MessageList";
import SuggestionList from "./chat/SuggestionList";

export const ChatInterface = () => {
  const { messages, isLoading, sendMessage } = useChat();
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  const suggestions = [
    "What are common symptoms of pediatric fever?",
    "How to handle infant vaccination schedules?",
    "Signs of respiratory distress in children",
    "Common childhood allergies and treatments",
  ];

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
        
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-sm">
          <MessageList messages={messages} />
          
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your medical query..."
                className="flex-1"
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                disabled={isLoading}
              />
              
              <Button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="bg-medical-primary hover:bg-medical-primary/90"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        
        <SuggestionList 
          suggestions={suggestions} 
          onSuggestionClick={sendMessage} 
        />
      </div>
    </div>
  );
};

export default ChatInterface;