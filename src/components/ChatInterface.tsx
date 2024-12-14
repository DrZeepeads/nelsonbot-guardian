import React, { useState } from "react";
import { useChat } from "@/hooks/useChat";
import { Send, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import MessageList from "./chat/MessageList";
import SuggestionList from "./chat/SuggestionList";
import { parsePDFContent } from "@/utils/pdfUtils";
import { uploadToCloudinary } from "@/services/cloudinaryService";

export default function ChatInterface() {
  const { messages, isLoading, sendMessage } = useChat();
  const [input, setInput] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [pdfPreview, setPdfPreview] = useState<string | null>(null);
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

    try {
      setIsUploading(true);
      setUploadProgress(0);

      // Upload to Cloudinary
      const cloudinaryUrl = await uploadToCloudinary(file, (progress) => {
        setUploadProgress(progress);
      });

      setPdfPreview(cloudinaryUrl);

      toast({
        title: "Success",
        description: "PDF uploaded successfully",
      });

      // Process the content if needed
      const content = await parsePDFContent(file);
      sendMessage(`Analyzing PDF content: ${content.substring(0, 500)}...`);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload PDF",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const clearPreview = () => {
    setPdfPreview(null);
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

      {isUploading && (
        <div className="fixed bottom-24 left-0 right-0 bg-white p-4 border-t">
          <div className="container mx-auto max-w-2xl">
            <Progress value={uploadProgress} className="w-full" />
            <p className="text-sm text-gray-500 mt-2">Uploading: {uploadProgress}%</p>
          </div>
        </div>
      )}
      
      {pdfPreview && (
        <div className="fixed bottom-24 left-0 right-0 bg-white p-4 border-t">
          <div className="container mx-auto max-w-2xl flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <span className="text-sm">PDF uploaded successfully</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={clearPreview}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
      
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-50">
        <div className="container mx-auto max-w-2xl flex items-center gap-2">
          <input
            type="file"
            accept=".pdf"
            id="pdf-upload"
            className="hidden"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
          <Button 
            variant="ghost" 
            size="icon"
            className="shrink-0 text-gray-400 hover:text-gray-600"
            onClick={() => document.getElementById('pdf-upload')?.click()}
            disabled={isUploading}
          >
            <FileText className="h-5 w-5" />
          </Button>
          
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about pediatric topics..."
            className="flex-1"
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            disabled={isLoading || isUploading}
          />
          
          <Button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading || isUploading}
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