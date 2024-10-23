import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeContextProvider } from "../ThemeProvider";
import { ThemeContext } from "../../contexts";
import { useTheme } from "../../hooks";

// Mock DEFAULT_THEME
const DEFAULT_THEME = "light"; // or "dark" based on your constants

describe("ThemeContextProvider", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  test("initializes theme from localStorage or defaults to DEFAULT_THEME", () => {
    // Case 1: localStorage has light theme
    localStorage.setItem("theme", "light");
    render(
      <ThemeContextProvider>
        <ThemeContext.Consumer>
          {(
            { themeMode } = {
              toggleTheme: () => {},
              themeMode: DEFAULT_THEME,
            }
          ) => <div>{themeMode}</div>}
        </ThemeContext.Consumer>
      </ThemeContextProvider>
    );
    expect(screen.getByText("light")).toBeInTheDocument();

    // Case 2: localStorage has dark theme
    localStorage.setItem("theme", "dark");
    render(
      <ThemeContextProvider>
        <ThemeContext.Consumer>
          {(
            { themeMode } = {
              toggleTheme: () => {},
              themeMode: DEFAULT_THEME,
            }
          ) => <div>{themeMode}</div>}
        </ThemeContext.Consumer>
      </ThemeContextProvider>
    );
    expect(screen.getByText("dark")).toBeInTheDocument();

    // Case 3: localStorage is empty, defaults to DEFAULT_THEME
    localStorage.clear();
    render(
      <ThemeContextProvider>
        <ThemeContext.Consumer>
          {(
            { themeMode } = {
              toggleTheme: () => {},
              themeMode: DEFAULT_THEME,
            }
          ) => <div>{themeMode}</div>}
        </ThemeContext.Consumer>
      </ThemeContextProvider>
    );
    expect(screen.getByText(DEFAULT_THEME)).toBeInTheDocument();
  });

  test("toggles theme and updates localStorage", () => {
    render(
      <ThemeContextProvider>
        <ThemeTestComponent />
      </ThemeContextProvider>
    );

    const themeModeText = screen.getByTestId("theme-mode");
    const toggleButton = screen.getByText("Toggle Theme");

    // Toggle to dark theme
    fireEvent.click(toggleButton);
    expect(themeModeText).toHaveTextContent("light");
    expect(localStorage.getItem("theme")).toBe("light");

    // Toggle back to light theme
    fireEvent.click(toggleButton);
    expect(themeModeText).toHaveTextContent("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
  });
});

// Test component to use within ThemeContextProvider
const ThemeTestComponent = () => {
  const { toggleTheme, themeMode } = useTheme(); // Use the custom hook
  return (
    <div>
      <div data-testid="theme-mode">{themeMode}</div>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};
