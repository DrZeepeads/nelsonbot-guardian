import React, { useState } from "react";
import { useChat } from "@/hooks/useChat";
import { Send, Plus, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import MessageList from "./chat/MessageList";
import SuggestionList from "./chat/SuggestionList";
import { parsePDFContent } from "@/utils/pdfUtils";
import { pdfService } from "@/services/pdfService";

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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validTypes = ['application/pdf', 'text/plain'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or TXT file",
        variant: "destructive",
      });
      return;
    }

    try {
      // First upload the file to Vercel
      await pdfService.uploadFile(file);
      toast({
        title: "Success",
        description: "File uploaded successfully",
      });

      // Then process the content
      if (file.type === 'application/pdf') {
        const content = await parsePDFContent(file);
        sendMessage(`Analyzing PDF content: ${content.substring(0, 500)}...`);
      } else {
        const content = await file.text();
        sendMessage(`Analyzing text content: ${content.substring(0, 500)}...`);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process file",
        variant: "destructive",
      });
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
          <input
            type="file"
            accept=".pdf,.txt"
            id="pdf-upload"
            className="hidden"
            onChange={handleFileUpload}
          />
          <Button 
            variant="ghost" 
            size="icon"
            className="shrink-0 text-gray-400 hover:text-gray-600"
            onClick={() => document.getElementById('pdf-upload')?.click()}
          >
            <FileText className="h-5 w-5" />
          </Button>
          
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