import React from "react";
import MobileMenuBar from "@/components/MobileMenuBar";
import ChatInterface from "@/components/ChatInterface";

function Index() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <MobileMenuBar />
      <div className="pt-16">
        <ChatInterface />
      </div>
    </div>
  );
}

export default Index;