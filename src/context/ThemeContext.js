import React, { createContext } from 'react';
import useCommonData from 'services/useCommonData';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  console.log("ENTRA THEME PROVIDER")
  const themeData = useCommonData();
  return (
    <ThemeContext.Provider value={themeData}>
      {children}
    </ThemeContext.Provider>
  );
};
