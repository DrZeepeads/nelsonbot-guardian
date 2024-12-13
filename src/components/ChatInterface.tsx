import { useState } from "react";
import { Mic, Send, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const ChatInterface = () => {
  const [message, setMessage] = useState("");
  const suggestions = [
    "Pediatric fever management",
    "Vaccination schedule",
    "Growth chart interpretation",
    "Common allergies",
  ];

  const handleSend = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
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
        
        {/* Suggestions */}
        <div className="flex flex-wrap justify-center gap-2 max-w-md">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setMessage(suggestion)}
              className="bg-medical-accent text-medical-primary px-4 py-2 rounded-full text-sm hover:bg-medical-secondary hover:text-white transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="px-4">
        <div className="bg-white border border-gray-200 rounded-lg flex items-center gap-2 p-2">
          <Button variant="ghost" size="icon">
            <Plus className="h-5 w-5 text-gray-500" />
          </Button>
          
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your medical query..."
            className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          
          <Button variant="ghost" size="icon">
            <Mic className="h-5 w-5 text-gray-500" />
          </Button>
          
          <Button 
            onClick={handleSend}
            disabled={!message.trim()}
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