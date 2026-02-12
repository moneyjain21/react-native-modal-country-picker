import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';

import { LightColors, DarkColors, ColorsType } from './Colors';

interface ThemeContextType {
  colors: ColorsType;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  colors: LightColors,
  isDarkMode: false,
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const value = useMemo(
    () => ({
      colors: isDarkMode ? DarkColors : LightColors,
      isDarkMode,
    }),
    [isDarkMode]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
