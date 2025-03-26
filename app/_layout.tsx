import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../context/AuthContext'
import { Slot } from 'expo-router';

import { Text } from 'react-native';

export default function RootLayout() {

  
  return (
    
        <AuthProvider>
          <Slot/>
        </AuthProvider>
    
  );}
