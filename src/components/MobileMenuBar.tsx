import React, { useState } from "react";
import { Menu, X, Home, BookOpen, History, Settings, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    icon: Home,
    label: "Home",
    href: "/",
  },
  {
    icon: BookOpen,
    label: "Resources",
    href: "/resources",
  },
  {
    icon: History,
    label: "History",
    href: "/history",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
  },
  {
    icon: HelpCircle,
    label: "Help",
    href: "/help",
  },
];

function MobileMenuBar() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-medical-primary shadow-lg z-50">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="text-xl font-semibold text-white">NelsonBot</div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMenu}
          className="text-white hover:bg-medical-primary/90 focus:ring-2 focus:ring-white/20"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      <nav
        className={cn(
          "absolute left-0 right-0 bg-white shadow-lg transition-all duration-200 ease-in-out",
          isMenuOpen ? "top-full opacity-100" : "-top-96 opacity-0"
        )}
      >
        <ul className="divide-y divide-gray-100">
          {menuItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <item.icon className="h-5 w-5 text-medical-primary" />
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default MobileMenuBar;