import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Moon, Home, History, LogIn } from "lucide-react";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-medical-primary flex items-center justify-between px-4 z-50">
      <h1 className="text-xl font-semibold text-white">NelsonBot</h1>
      
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="text-white">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl">
          <div className="pt-6">
            <h2 className="text-xl font-semibold mb-6 text-center">Menu</h2>
            <nav className="space-y-4">
              <Button variant="ghost" className="w-full justify-start text-lg gap-3">
                <Home className="h-5 w-5" />
                Home
              </Button>
              <Button variant="ghost" className="w-full justify-start text-lg gap-3">
                <History className="h-5 w-5" />
                History
              </Button>
              <Button variant="ghost" className="w-full justify-start text-lg gap-3">
                <LogIn className="h-5 w-5" />
                Sign In
              </Button>
              <div className="h-px bg-gray-200 my-4" />
              <Button variant="ghost" className="w-full justify-start text-lg gap-3">
                <Moon className="h-5 w-5" />
                Dark Mode
              </Button>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;