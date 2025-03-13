import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import LoginNavigator from './LoginNavigator';
import AppNavigator from './AppNavigator';
import { StringConstants } from 'configs';
import { lightColors, darkColors, StyleLogin } from 'styles';
import { ThemeContext } from 'context';


//Controla qué navegador se muestra según el estado de autenticación
const RootNavigator = () => {
  //Simulación del estado de autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true)
  
  console.log("Root navigator una línea antes")
  console.log(useContext(ThemeContext))
  const { colorScheme, colors } = useContext(ThemeContext);
  
  console.log("Root navigator una línea después")

  const { t } = useTranslation();



  const spinnerColor = colorScheme == 'dark' ? lightColors.background : darkColors.background

  const style = StyleLogin({colorScheme,colors})

  useEffect(() => {
    // Aquí se haría la comprobación de sesión, por ejemplo, con AsyncStorage o Firebase
    // Simulamos un retardo para la verificación:
    setTimeout(() => {
      // Cambia a true si el usuario está autenticado
      setIsAuthenticated(false);
      setLoading(false);
    }, 3000);
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

  return isAuthenticated ? <AppNavigator /> : <LoginNavigator />;


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