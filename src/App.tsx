// App.tsx

import React, { useEffect, useState } from "react";
import "./App.css";

import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Container,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import TodoList from "./components/TodoList"; // Import TodoList
import { useResponsive, useTheme } from "./hooks";
import { useTranslation } from "react-i18next";

function App() {
  const { toggleTheme, themeMode } = useTheme();
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();
  const [value, setValue] = useState(0);
  const isMobile = useResponsive();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // For language menu

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (language: string) => {
    changeLanguage(language);
    handleMenuClose();
  };

  // Effect to handle the direction of the document based on the selected language
  useEffect(() => {
    if (language === "ar") {
      document.documentElement.setAttribute("dir", "rtl");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
    }
  }, [language]);

  return (
    <>
      {/* AppBar for Desktop View */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {t("title")}
          </Typography>
          <IconButton color="inherit" onClick={toggleTheme}>
            {themeMode === "light" ? "🌙" : "☀️"}{" "}
            {/* Emoji for visual theme toggle */}
          </IconButton>
          <IconButton
            color="inherit"
            onClick={handleMenuClick} // Open language menu
          >
            {language === "en" ? "English" : "العربية"}{" "}
            {/* Show current language */}
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleLanguageChange("en")}>
              English
            </MenuItem>
            <MenuItem onClick={() => handleLanguageChange("ar")}>
              العربية
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container>
        <TodoList /> {/* Include TodoList component */}
      </Container>

      {/* Bottom Navigation for Mobile View */}
      {isMobile && (
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
          sx={{ position: "fixed", bottom: 0, width: "100%" }}
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction label="Search" icon={<SearchIcon />} />
          <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
        </BottomNavigation>
      )}
    </>
  );
}

export default App;
