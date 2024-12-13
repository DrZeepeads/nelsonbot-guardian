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
    <div className="w-full max-w-2xl space-y-4 overflow-y-auto px-4">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={cn(
            "p-4 rounded-lg max-w-[80%] shadow-sm",
            msg.isUser
              ? "bg-medical-primary text-white ml-auto"
              : "bg-medical-accent text-medical-primary mr-auto"
          )}
        >
          {msg.text}
        </div>
      ))}
    </div>
  );
};

export default MessageList;