import React, { createContext, useState, useContext, ReactNode } from "react";
import { IoSunny, IoMoon } from "react-icons/io5";

// Create ThemeContext
const ThemeContext = createContext({
  dark: false,
  toggleDarkMode: () => {},
});

// ThemeProvider component
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [dark, setDark] = useState(false);

  const toggleDarkMode = () => {
    setDark(!dark);
    document.body.classList.toggle("dark", !dark);
  };

  return (
    <ThemeContext.Provider value={{ dark, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to access the theme context
export const useTheme = () => useContext(ThemeContext);

// ThemeToggle component for UI
export const ThemeToggle = () => {
  const { dark, toggleDarkMode } = useTheme();

  return (
    <button onClick={toggleDarkMode} className="p-2">
      {dark ? <IoSunny className="text-grey-700" /> : <IoMoon className="text-grey-500" />}
    </button>
  );
};
