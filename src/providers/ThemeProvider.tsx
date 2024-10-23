import React, { useState, useMemo } from "react";
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeContext } from "../contexts";
import { DEFAULT_THEME } from "../constants"; // This should be "light" or "dark"

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Set the theme initially from localStorage or fallback to DEFAULT_THEME
  const [themeMode, setThemeMode] = useState<"light" | "dark">(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "light" || savedTheme === "dark"
      ? savedTheme
      : DEFAULT_THEME;
  });

  // Toggle theme and store it in localStorage
  const toggleTheme = () => {
    setThemeMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      localStorage.setItem("theme", newMode);
      return newMode;
    });
  };

  // Create MUI theme based on current mode
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
        },
      }),
    [themeMode]
  );

  return (
    <ThemeContext.Provider value={{ toggleTheme, themeMode }}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};
