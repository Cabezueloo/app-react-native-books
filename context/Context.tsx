import { me } from '../api/generated/helloAPIPlatform';
import { UserJsonld, UserJsonldUserRead } from '../api/model';
import { LOCAL_STORAGE_KEY_TOKEN } from '../constants/Common';
import { ROUTES } from '../constants/Routes';
import { getData, removeData, storeData } from '../utils/asyncStorage';

import { router } from 'expo-router';

import { createContext, useContext, useState } from 'react';
import { Colors, ColorsInterface } from '../constants/Colors';
import { useColorScheme } from 'react-native';

type ContextType = {
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
  apiMe: () => Promise<void>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  isAuthenticated: boolean;
  currentUser?: UserJsonldUserRead;
  colorScheme: string;
  colors:ColorsInterface
};

const Context = createContext<ContextType>(null!);

export function Provider({ children }: { children: React.ReactNode }) {
  const [currentUser, setUser] = useState<UserJsonldUserRead | undefined>(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //const colorScheme : string = 'light'
  const colorScheme : string = useColorScheme()
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;
  
  const signIn = async (newToken: string) => {
    await storeData(LOCAL_STORAGE_KEY_TOKEN, newToken)
    setIsAuthenticated(true);
    apiMe()
    router.replace(ROUTES.PAGE_SEARCH)

  };

  const signOut = async () => {
    await removeData(LOCAL_STORAGE_KEY_TOKEN)
    setIsAuthenticated(false);
    router.replace(ROUTES.PAGE_LOGIN)

  };

  const apiMe = async () => {
    
    setIsLoading(true);
    
    try {
      const token = await getData(LOCAL_STORAGE_KEY_TOKEN);
      if (!token)
      { 
    
        setIsAuthenticated(false);
        return;
      }

      
      const currentUser = await me();
      
      if(currentUser != undefined)
      {
        setUser(currentUser)
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      await signOut();
      
      console.log("error")
      
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <Context.Provider value={{ signIn, signOut, isLoading, isAuthenticated, apiMe, currentUser, setIsLoading,colorScheme,colors }}>
      {children}
    </Context.Provider>
  );
}

export function useAuthAndStyle() {
  return useContext(Context);
}