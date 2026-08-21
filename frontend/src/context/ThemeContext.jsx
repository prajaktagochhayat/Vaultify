import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('vaultify_theme');
    if (saved === 'dark') return true;
    if (saved === 'light') return false;
    // Default to false (Light Mode)
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (isDarkMode) {
      root.className = 'dark';
      body.className = 'dark bg-[#17110D] text-[#F7EFE6] font-sans antialiased select-none min-h-screen transition-colors duration-200';
      root.style.colorScheme = 'dark';
      localStorage.setItem('vaultify_theme', 'dark');
    } else {
      root.className = 'light';
      body.className = 'light bg-[#FAF6F0] text-[#3A2010] font-sans antialiased select-none min-h-screen transition-colors duration-200';
      root.style.colorScheme = 'light';
      localStorage.setItem('vaultify_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const setThemeMode = (mode) => {
    if (mode === 'dark') {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

