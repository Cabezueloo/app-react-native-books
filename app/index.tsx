//import { PAGE_HOME, PAGE_LOGIN, PAGE_REGISTER, PAGE_RESET_PASSWORD } from '@config';
import useCommonData from './services/useCommonData';
import { DataContext, DataProvider } from './context/DataContext';
import { darkColors, lightColors, StyleLogin } from './styles';
import { Stack } from 'expo-router'
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { use } from 'i18next';
import AppNavigator from './navigations/AppNavigator';
import LoginNavigator from './navigations/LoginNavigator';
import { NavigationContainer } from '@react-navigation/native';

export default function Start() {
  console.log("ENTRA ROOT NAVIGATOR")
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null)

  const [loading, setLoading] = useState(true)
  const { colorScheme, colors, isLogged, userDataInDataBase } = useCommonData()

  const style = StyleLogin({ colorScheme, colors })
  const spinnerColor = colorScheme == 'dark' ? lightColors.background : darkColors.background
  useEffect(() => {
    setTimeout(() => {

      setIsAuthenticated(isLogged)

      if (isLogged) {
        setUserData(userDataInDataBase)
      }
      setLoading(false)
    }, 1000)
  })
  if (loading) {
    return (
      <SafeAreaProvider>

        <SafeAreaView style={styles({ color: colors.background }).container}>
         
        </SafeAreaView>
      </SafeAreaProvider>

    );
  }

  return (
      <SafeAreaProvider>

    <SafeAreaView>
      <DataProvider>
            
    {isAuthenticated ? <AppNavigator userData={userData} /> : <LoginNavigator />}

    </DataProvider>
    </SafeAreaView>

      </SafeAreaProvider>

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