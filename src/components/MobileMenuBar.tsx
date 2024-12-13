import React from "react";
import { Menu, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MobileMenuBar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-blue-500 text-white">
      <div className="flex items-center justify-between px-4 py-3">
        <Button 
          variant="ghost" 
          size="icon"
          className="text-white hover:bg-blue-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>
        
        <h1 className="text-xl font-bold">NelsonBot</h1>
        
        <Button 
          variant="ghost" 
          size="icon"
          className="text-white hover:bg-blue-600"
        >
          <Settings className="h-6 w-6" />
        </Button>
      </div>
    </header>
  );
}