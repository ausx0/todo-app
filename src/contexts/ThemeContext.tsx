import { createContext } from "react";

interface ThemeContextType {
  toggleTheme: () => void;
  themeMode: "light" | "dark";
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);
