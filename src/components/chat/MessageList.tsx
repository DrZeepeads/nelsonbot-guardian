import { cn } from "@/lib/utils";

interface Message {
  text: string;
  isUser: boolean;
}

interface MessageListProps {
  messages: Message[];
}

export const MessageList = ({ messages }: MessageListProps) => {
  return (
    <div className="w-full max-w-2xl space-y-4 overflow-y-auto px-4 mb-24">
      {!messages.length && (
        <div className="p-4 rounded-lg bg-gray-100 text-gray-800">
          Hello! I'm NelsonBot, your pediatric knowledge assistant. How can I help you today?
        </div>
      )}
      
      {messages.map((msg, index) => (
        <div
          key={index}
          className={cn(
            "p-4 rounded-lg max-w-[80%]",
            msg.isUser
              ? "bg-medical-primary text-white ml-auto"
              : "bg-gray-100 text-gray-800 mr-auto"
          )}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
};

export default MessageList;