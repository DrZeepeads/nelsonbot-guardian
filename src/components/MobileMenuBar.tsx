import React from "react";
import { Menu, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MobileMenuBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
      <div className="flex items-center justify-between px-4 py-3">
        <Button 
          variant="ghost" 
          size="icon"
          className="text-blue-500 hover:bg-blue-50"
        >
          <Menu className="h-6 w-6" />
        </Button>
        
        <h1 className="text-xl font-bold text-blue-500">NelsonBot</h1>
        
        <Button 
          variant="ghost" 
          size="icon"
          className="text-blue-500 hover:bg-blue-50"
        >
          <Settings className="h-6 w-6" />
        </Button>
      </div>
    </header>
  );
}