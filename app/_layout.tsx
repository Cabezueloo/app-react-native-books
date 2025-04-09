import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from '../context/Context'
import { Slot } from 'expo-router';

import { StatusBar, Text, useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import React from 'react'

export default function RootLayout() {
  const colorScheme = useColorScheme()

  const barStyle = colorScheme=='dark'?'light-content':'dark-content'
  const backgroundColor = colorScheme=='dark'?'#2C3E50':'#ECF0F1'

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex:1}}>
        <StatusBar barStyle={barStyle} backgroundColor={backgroundColor}/>
        <Provider>
            <Slot/>
            <Toast
            position='top' />

        </Provider>
        </SafeAreaView>
    </SafeAreaProvider>
    
  );}
