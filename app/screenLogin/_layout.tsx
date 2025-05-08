import { Slot } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { Provider } from '../../context/Context';

export default function LoginLayout() {

  return (
    <Provider>
      <PaperProvider>

        <Slot />
        

      </PaperProvider>

    </Provider>

  )
}
