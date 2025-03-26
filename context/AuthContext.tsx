import { UserJsonld } from '../api/model';
import { LOCAL_STORAGE_KEY_TOKEN } from '../constants/Common';
import { ROUTES } from '../constants/Routes';
import { getData, removeData, storeData } from '../utils/asyncStorage';

import { router } from 'expo-router';

import { createContext, useContext, useState } from 'react';


type AuthContextType = {
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
  apiMe: () => Promise<void>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  isAuthenticated: boolean;
  currentUser?: UserJsonld;
};

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setUser] = useState<UserJsonld | undefined>(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signIn = async (newToken: string) => {
    await storeData(LOCAL_STORAGE_KEY_TOKEN, newToken)
    setIsAuthenticated(true);
    router.replace(ROUTES.PAGE_LOGIN)
  };

  const signOut = async () => {
    await removeData(LOCAL_STORAGE_KEY_TOKEN)
    setIsAuthenticated(false);
  };

  const apiMe = async () => {
    try {
      const token = await getData(LOCAL_STORAGE_KEY_TOKEN);
      
      if (!token)
      { 
        setIsAuthenticated(false);
        return;
      }

      setIsLoading(true);
      //const currentUser = await me();
      const currentUser = undefined
      setIsLoading(false);
      if(currentUser != undefined)
      {
        setUser(currentUser)
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      await signOut();
      setIsLoading(false);
      console.log("error")
      
    }
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, isLoading, isAuthenticated, apiMe, currentUser, setIsLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}