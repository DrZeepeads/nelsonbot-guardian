import { Github } from "lucide-react";
import { Button } from "./ui/button";

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 z-50 shadow-md">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <p className="text-sm text-gray-600 truncate">
          Powered by Nelson Textbook of Pediatrics
        </p>
        
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-600 hover:text-medical-primary whitespace-nowrap"
          onClick={() => window.open('https://github.com', '_blank')}
        >
          <Github className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">View Source</span>
        </Button>
      </div>
    </footer>
  );
};

export default Footer;