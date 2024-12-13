import Header from "@/components/Header";
import ChatInterface from "@/components/ChatInterface";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      <div className="pt-16">
        <ChatInterface />
      </div>
    </div>
  );
};

export default Index;