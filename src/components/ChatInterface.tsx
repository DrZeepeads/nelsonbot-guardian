import { useChat } from "@/hooks/useChat";
import MessageList from "./chat/MessageList";
import SuggestionList from "./chat/SuggestionList";
import ChatInput from "./chat/ChatInput";

export const ChatInterface = () => {
  const { messages, isLoading, sendMessage } = useChat();

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
        
        <MessageList messages={messages} />
        
        <SuggestionList 
          suggestions={suggestions} 
          onSuggestionClick={sendMessage} 
        />
      </div>

      <ChatInput
        isLoading={isLoading}
        onSend={sendMessage}
      />
    </div>
  );
};

export default ChatInterface;