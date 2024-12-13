import { type ThemeConfig } from "@/types/theme";

export const theme: ThemeConfig = {
  light: {
    background: "bg-background",
    text: "text-text-primary",
    primary: "text-primary",
    secondary: "text-text-secondary",
    accent: "text-accent",
    border: "border-border",
  },
  dark: {
    background: "bg-dark-background",
    text: "text-dark-text-primary",
    primary: "text-primary-light",
    secondary: "text-dark-text-secondary",
    accent: "text-accent-light",
    border: "border-dark-border",
  },
};

export default theme;