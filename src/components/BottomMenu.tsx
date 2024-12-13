import React, { useState } from "react";
import { Home, Clock, LogIn, Moon, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function BottomMenu() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <Button
        onClick={toggleMenu}
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 bg-blue-500 text-white hover:bg-blue-600 rounded-full shadow-lg z-50"
      >
        {isMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </Button>

      {isMenuOpen && (
        <div
          className="fixed inset-x-0 bottom-0 bg-white shadow-xl rounded-t-3xl z-40 p-6 animate-in slide-in-from-bottom duration-300"
          style={{ height: "40vh" }}
        >
          <div className="flex justify-center mb-4">
            <div className="w-12 h-1 bg-gray-300 rounded"></div>
          </div>

          <h2 className="text-lg font-semibold text-center mb-6 text-blue-500">Menu</h2>

          <ul className="space-y-4">
            <li>
              <Button
                variant="ghost"
                className="w-full justify-start gap-4 text-lg font-medium text-gray-800"
                onClick={() => navigate("/")}
              >
                <Home className="w-6 h-6 text-gray-700" />
                Home
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className="w-full justify-start gap-4 text-lg font-medium text-gray-800"
                onClick={() => navigate("/history")}
              >
                <Clock className="w-6 h-6 text-gray-700" />
                History
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className="w-full justify-start gap-4 text-lg font-medium text-gray-800"
                onClick={() => navigate("/login")}
              >
                <LogIn className="w-6 h-6 text-gray-700" />
                Sign In
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className="w-full justify-start gap-4 text-lg font-medium text-gray-800"
                onClick={() => alert("Dark Mode toggled!")}
              >
                <Moon className="w-6 h-6 text-gray-700" />
                Dark Mode
              </Button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}