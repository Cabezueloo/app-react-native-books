import React, { createContext } from 'react';
import useCommonData from 'services/useCommonData';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  console.log("ENTRA THEME PROVIDER")
  const data = useCommonData();

  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  );
};
