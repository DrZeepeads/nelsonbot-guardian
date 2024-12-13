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
        <div className="w-full max-w-2xl bg-white rounded-lg">
          <MessageList messages={messages} />
          
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
            {!messages.length ? (
              <SuggestionList 
                suggestions={suggestions} 
                onSuggestionClick={sendMessage}
              />
            ) : null}
            
            <div className="flex items-center gap-2 max-w-2xl mx-auto">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about pediatric topics..."
                className="flex-1"
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                disabled={isLoading}
              />
              
              <Button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="bg-medical-primary hover:bg-medical-primary/90 text-white rounded-full p-3 h-auto"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;