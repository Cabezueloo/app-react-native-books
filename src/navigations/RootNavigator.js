import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import LoginNavigator from './LoginNavigator';
import AppNavigator from './AppNavigator';
import { StringConstants, TABLE_USER } from 'configs';
import { lightColors, darkColors, StyleLogin } from 'styles';
import { DataContext } from 'context';
import { getUser, supabase } from 'services/supabase';




//Controla qué navegador se muestra según el estado de autenticación
const RootNavigator = () => {

  console.log("ENTRA ROOT NAVIGATOR")

  const { colorScheme, colors, isLogged, userDataInDataBase } = useContext(DataContext);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState(null)


  console.log("Root Navigator -> ", isLogged)
  console.log("Root Navigator -> ", userDataInDataBase)

  const { t } = useTranslation();

  const spinnerColor = colorScheme == 'dark' ? lightColors.background : darkColors.background

  const style = StyleLogin({ colorScheme, colors })

  useEffect(() => {
    setTimeout(() => {

      setIsAuthenticated(isLogged)

      if (isLogged) {
        setUserData(userDataInDataBase)
      }
      setLoading(false)
    },1000)

  }, []);

  if (loading) {
    return (
      <SafeAreaProvider>

        <SafeAreaView style={styles({ color: colors.background }).container}>
          <Image
            source={require('../assets/icon.png')}
            style={styles.image}
          />
          <Text style={style.basicLabel}>{t(StringConstants.developedBy)}</Text>
          <ActivityIndicator size={"large"} color={spinnerColor} />
        </SafeAreaView>
      </SafeAreaProvider>

    );
  }

  return isAuthenticated ? <AppNavigator userData={userData} /> : <LoginNavigator />;


};
const styles = (props) => StyleSheet.create({
  image: {

    resizeMode: "cover",

  },

  container: {
    flex: 1,
    backgroundColor: props.color,
    justifyContent: "center",
    alignItems: "center",
  }
});


export default RootNavigator;