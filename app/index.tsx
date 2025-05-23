//import { PAGE_HOME, PAGE_LOGIN, PAGE_REGISTER, PAGE_RESET_PASSWORD } from '@config';
import { Redirect,} from 'expo-router'
import { useEffect, useState, } from 'react';
import { Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { StringConstants } from '../configs';
import { PaperProvider } from 'react-native-paper';
import { ROUTES } from '../constants/Routes';
import { useAuthAndStyle } from '../context/Context';

export default function Start() {

  const { t } = useTranslation()

  
  const { isAuthenticated, isLoading, apiMe,colorScheme, colors} = useAuthAndStyle();

  //TODO
  const spinnerColor = colorScheme == 'dark' ? '#FFFFFFF' : '#FFFFFFF'

  
   // Add local state for initial loading
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // Set timeout to handle initial 3-second delay
    const timeout = setTimeout(() => {
      setInitialLoading(false);
      // Trigger authentication check after initial delay
      apiMe();
    }, 1500);

    // Cleanup timeout on component unmount
    return () => clearTimeout(timeout);
  }, []); // Empty dependency array ensures this runs only once

  // Show spinner during initial loading or auth check
  if (initialLoading || isLoading) {
    
    return (
      <SafeAreaProvider>

        <SafeAreaView style={styles({ color: colors.background }).container}>
          <Image
            source={require('../assets/icon.png')}
            style={{
              resizeMode: "cover",
            }}
          />
          <Text style={{color:colors.accent}}>{t(StringConstants.developedBy)}</Text>
          <ActivityIndicator size={"large"} color={spinnerColor} />
        </SafeAreaView>
      </SafeAreaProvider>

    );
  }

  return (
    <PaperProvider>

      <SafeAreaProvider>

        <SafeAreaView style={styles({ color: colors.background }).container}>
          {isAuthenticated ? <Redirect href={ROUTES.PAGE_SEARCH} /> : <Redirect href={ROUTES.PAGE_LOGIN} />}
        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>




  )

};

const styles = (props) => StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: props.color,
    justifyContent: "center",
    alignItems: "center",
  }
});