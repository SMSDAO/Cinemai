/**
 * Theme Context
 * Manages theme state and preferences
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { theme as defaultTheme } from '../theme/tokens';

interface ThemeContextType {
  theme: typeof defaultTheme;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode] = useState(true); // Always dark for Neo Glow

  const toggleTheme = () => {
    // Neo Glow is always dark, but keep for extensibility
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: defaultTheme,
        isDarkMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
