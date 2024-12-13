import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Brand Colors
        primary: {
          DEFAULT: "#2D9CDB",
          dark: "#1B6CA8",
          light: "#56CCF2",
          foreground: "#FFFFFF",
        },
        // Neutral Colors
        background: "#F9FAFB",
        surface: "#FFFFFF",
        text: {
          primary: "#111827",
          secondary: "#6B7280",
        },
        border: "#E5E7EB",
        // Secondary/Accent Colors
        accent: {
          DEFAULT: "#F2994A",
          hover: "#D97706",
          light: "#FFE5D9",
          foreground: "#FFFFFF",
        },
        // Feedback Colors
        success: {
          DEFAULT: "#27AE60",
          foreground: "#FFFFFF",
        },
        warning: {
          DEFAULT: "#F2C94C",
          foreground: "#111827",
        },
        error: {
          DEFAULT: "#EB5757",
          foreground: "#FFFFFF",
        },
        info: {
          DEFAULT: "#56CCF2",
          foreground: "#FFFFFF",
        },
        // Dark Mode Colors
        dark: {
          background: "#1F2937",
          surface: "#374151",
          text: {
            primary: "#F9FAFB",
            secondary: "#9CA3AF",
          },
          border: "#4B5563",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;