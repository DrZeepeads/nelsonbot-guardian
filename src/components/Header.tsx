import { Menu, Moon, Home, History, LogIn, Settings, BookOpen, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const menuItems = [
  {
    title: "Main",
    items: [
      { icon: Home, label: "Home", href: "/" },
      { icon: BookOpen, label: "Resources", href: "/resources" },
      { icon: History, label: "History", href: "/history" },
    ]
  },
  {
    title: "Account",
    items: [
      { icon: LogIn, label: "Sign In", href: "/signin" },
      { icon: Settings, label: "Settings", href: "/settings" },
      { icon: HelpCircle, label: "Help", href: "/help" },
    ]
  }
];

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-medical-primary flex items-center justify-between px-4 z-50 shadow-lg">
      <div className="flex items-center gap-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-medical-primary/90 focus:ring-2 focus:ring-white/20"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] p-0 border-r border-gray-200">
            <div className="flex flex-col h-full">
              <div className="p-6 border-b border-gray-200 bg-medical-primary/5">
                <h2 className="text-2xl font-semibold text-medical-primary">NelsonBot</h2>
                <p className="text-sm text-gray-600 mt-1">AI-powered pediatric insights</p>
              </div>
              
              <nav className="flex-1 overflow-auto">
                {menuItems.map((section) => (
                  <div key={section.title} className="p-4">
                    <h3 className="mb-2 text-sm font-medium text-gray-500 uppercase tracking-wider">
                      {section.title}
                    </h3>
                    <div className="space-y-1">
                      {section.items.map((item) => (
                        <Button
                          key={item.label}
                          variant="ghost"
                          className="w-full justify-start gap-3 h-10 hover:bg-medical-primary/5 hover:text-medical-primary"
                          asChild
                        >
                          <a href={item.href}>
                            <item.icon className="h-4 w-4" />
                            {item.label}
                          </a>
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </nav>

              <div className="border-t border-gray-200 p-4">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-3 hover:bg-medical-primary/5 hover:text-medical-primary"
                >
                  <Moon className="h-4 w-4" />
                  Dark Mode
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <h1 className="text-xl font-semibold text-white">NelsonBot</h1>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-white hover:bg-medical-primary/90 focus:ring-2 focus:ring-white/20"
        >
          Sign In
        </Button>
      </div>
    </header>
  );
};

export default Header;