import { type ThemeConfig } from "@/types/theme";

export const theme: ThemeConfig = {
  light: {
    background: "bg-white",
    text: "text-gray-900",
    primary: "text-medical-primary",
    secondary: "text-medical-secondary",
    accent: "text-medical-accent",
    border: "border-gray-200",
  },
  dark: {
    background: "bg-gray-900",
    text: "text-gray-100",
    primary: "text-medical-primary",
    secondary: "text-medical-secondary",
    accent: "text-medical-accent",
    border: "border-gray-700",
  },
};

export default theme;