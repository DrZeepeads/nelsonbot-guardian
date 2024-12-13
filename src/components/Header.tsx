import { Menu, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-50">
      <Button variant="ghost" size="icon">
        <Menu className="h-6 w-6 text-medical-primary" />
      </Button>
      
      <h1 className="text-xl font-semibold text-medical-primary">NelsonBot</h1>
      
      <Button variant="ghost" size="icon">
        <Settings className="h-6 w-6 text-medical-primary" />
      </Button>
    </header>
  );
};

export default Header;