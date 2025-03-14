import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigations/RootNavigator'
import { DataProvider, ThemeProvider } from 'context/DataContext';

export default function App() {

  
  return (
    <DataProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </DataProvider>
  );
}
