import React from "react";
import MobileMenuBar from "@/components/MobileMenuBar";
import ChatInterface from "@/components/ChatInterface";

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      <MobileMenuBar />
      <main className="container mx-auto px-4 pt-20 pb-24">
        <div className="flex flex-col items-center text-center space-y-6 mb-8">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-4xl">👶</span>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-blue-500">Welcome to NelsonBot</h1>
            <p className="text-gray-600">
              Your AI assistant for pediatric insights, powered by the Nelson Textbook of Pediatrics
            </p>
          </div>
        </div>
        <ChatInterface />
      </main>
    </div>
  );
}