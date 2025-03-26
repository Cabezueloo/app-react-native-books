import { Slot, Stack } from 'expo-router';
import { Text } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from '../../context/Context';

export default function LoginLayout() {
  console.log("LOGIN LAYOUT")

  return (
    <Provider>
    <PaperProvider>
      
      <Slot/>
      </PaperProvider>

    </Provider>

  )
}
