import React, { createContext } from 'react';
import {useCommonData} from '@services';

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  console.log("ENTRA Data PROVIDER")
  const data = useCommonData();

  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  );
};
