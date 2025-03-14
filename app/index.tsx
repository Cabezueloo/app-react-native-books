import {  useNavigation } from 'expo-router';
import { Text, View } from 'react-native';
import { useEffect } from 'react';
import LoginLayout from './_layout';
import { DataProvider } from './context/DataContext';
import RootLayout from './_layout';

export default function Home() {

  return (
    <DataProvider>
   <RootLayout></RootLayout>
    </DataProvider>
  );
}
