import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigations/RootNavigator'
import { DataProvider, ThemeProvider } from 'app/context/DataContext';

export default function App() {

  
  return (
    <DataProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </DataProvider>
  );
}
