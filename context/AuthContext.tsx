import { me } from '../api/generated/helloAPIPlatform';
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
    router.replace(ROUTES.PAGE_SEARCH)

  };

  const signOut = async () => {
    console.log("entra sign out")
    await removeData(LOCAL_STORAGE_KEY_TOKEN)
    setIsAuthenticated(false);
    router.replace(ROUTES.PAGE_LOGIN)

  };

  const apiMe = async () => {
    
    setIsLoading(true);
    try {
      const token = await getData(LOCAL_STORAGE_KEY_TOKEN);
      console.log(token)
      if (!token)
      { 
        setIsLoading(false);
        setIsAuthenticated(false);
        return;
      }

      
      const currentUser = await me();
      console.log("Current user despues de hacer el me ->",currentUser)
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