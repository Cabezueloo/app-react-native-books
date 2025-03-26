import { DataProvider } from '../../context/DataContext';
import { Slot, Stack } from 'expo-router';
import { Text } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AuthProvider } from '../../context/AuthContext';

export default function LoginLayout() {
  console.log("LOGIN LAYOUT")

  return (
    <AuthProvider>
    <PaperProvider>

      <Slot/>
      </PaperProvider>

    </AuthProvider>

  )
}
