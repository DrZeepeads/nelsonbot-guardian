import { useState } from "react";
import { Mic, Send, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  isLoading: boolean;
  onSend: (message: string) => void;
}

export const ChatInput = ({ isLoading, onSend }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage(""); // Clear input after sending
  };

  return (
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
  );
};

export default ChatInput;