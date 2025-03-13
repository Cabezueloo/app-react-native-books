import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigations/RootNavigator'
import { ThemeProvider } from 'context/ThemeContext';

export default function App() {

  
  return (
    <ThemeProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}
