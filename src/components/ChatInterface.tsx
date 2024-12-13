import React, { useState } from "react";
import { useChat } from "@/hooks/useChat";
import { Send, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MessageList from "./chat/MessageList";
import SuggestionList from "./chat/SuggestionList";

const ChatInterface = () => {
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
    <div className="flex flex-col h-[calc(100vh-4rem)] pt-16">
      <div className="flex-1 overflow-y-auto pb-32">
        <MessageList messages={messages} />
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-40">
        {!messages.length && (
          <div className="max-w-2xl mx-auto mb-4">
            <SuggestionList 
              suggestions={suggestions} 
              onSuggestionClick={sendMessage}
            />
          </div>
        )}
        
        <div className="flex items-center gap-2 max-w-2xl mx-auto">
          <Button 
            variant="ghost" 
            size="icon" 
            className="shrink-0"
          >
            <Plus className="h-5 w-5 text-muted-foreground" />
          </Button>
          
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about pediatric topics..."
            className="flex-1 bg-background"
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            disabled={isLoading}
          />
          
          <Button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="shrink-0 bg-medical-primary hover:bg-medical-primary/90 text-white"
            size="icon"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;