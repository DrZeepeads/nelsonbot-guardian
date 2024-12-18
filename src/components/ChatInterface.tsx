import React, { useState } from "react";
import { useChat } from "@/hooks/useChat";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import MessageList from "./chat/MessageList";
import SuggestionList from "./chat/SuggestionList";

export default function ChatInterface() {
  const { messages, isLoading, sendMessage } = useChat();
  const [input, setInput] = useState("");
  const { toast } = useToast();

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
    <div className="flex flex-col h-full relative pb-24">
      <div className="flex-1 overflow-y-auto">
        {!messages.length ? (
          <div className="space-y-4">
            <SuggestionList 
              suggestions={suggestions} 
              onSuggestionClick={(suggestion) => {
                sendMessage(suggestion);
              }}
            />
          </div>
        ) : (
          <div className="space-y-4 mb-4">
            <MessageList messages={messages} />
          </div>
        )}
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-50">
        <div className="container mx-auto max-w-2xl flex items-center gap-2">
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
            className="shrink-0 bg-primary hover:bg-primary-dark text-white"
            size="icon"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}