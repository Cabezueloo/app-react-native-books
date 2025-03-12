import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {Text, StyleSheet,Image,ActivityIndicator} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import LoginNavigator from './LoginNavigator';
import AppNavigator from './AppNavigator';
import { StringConstants } from 'configs';


//Controla qué navegador se muestra según el estado de autenticación
const RootNavigator = () => {
    //Simulación del estado de autenticación
    const[isAuthenticated, setIsAuthenticated] = useState(false);
    const[loading, setLoading] = useState(true)
    const {t} = useTranslation();


    useEffect(() => {
        // Aquí se haría la comprobación de sesión, por ejemplo, con AsyncStorage o Firebase
        // Simulamos un retardo para la verificación:
        setTimeout(() => {
          // Cambia a true si el usuario está autenticado
          setIsAuthenticated(false);
          setLoading(false);
        }, 5000);
      }, []);

      if (loading) {
        return (
         <SafeAreaProvider>

          <SafeAreaView style={styles.container}>
          <Image
          source={require('../assets/icon.png')}
          style={styles.image}
          />
          <Text>{t(StringConstants.developedBy)}</Text>
          <ActivityIndicator size={"large"} color={'#C0392B'}/>
          </SafeAreaView>
         </SafeAreaProvider>
                    
        );
    }

    return isAuthenticated ? <AppNavigator /> : <LoginNavigator />;


};
const styles = StyleSheet.create({
  image: {
    
    resizeMode: "cover",
        
  },
  container: {
    flex: 1,
    backgroundColor: '#2C3E50',
    justifyContent: "center",
    alignItems: "center",
  }
});


export default RootNavigator;