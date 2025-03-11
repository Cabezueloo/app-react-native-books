//Controla qué navegador se muestra según el estado de autenticación

import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import LoginNavigator from './LoginNavigator';
import AppNavigator from './AppNavigator';


const RootNavigator = () => {
    //Simulación del estado de autenticación
    const[isAuthenticated, setIsAuthenticated] = useState(false);
    const[loading, setLoading] = useState(true)



    useEffect(() => {
        // Aquí se haría la comprobación de sesión, por ejemplo, con AsyncStorage o Firebase
        // Simulamos un retardo para la verificación:
        setTimeout(() => {
          // Cambia a true si el usuario está autenticado
          setIsAuthenticated(false);
          setLoading(false);
        }, 1500);
      }, []);

      if (loading) {
        return (
          <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
          </View>
        );
    }

    return isAuthenticated ? <AppNavigator /> : <LoginNavigator />;


};

export default RootNavigator;