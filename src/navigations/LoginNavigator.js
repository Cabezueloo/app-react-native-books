// src/navigation/AuthNavigator.js
import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, ResetPasswordScreen, RegisterScreen } from 'screens';

import { StatusBar } from 'expo-status-bar';

import { PAGE_LOGIN, PAGE_REGISTER, PAGE_RESET_PASSWORD } from 'configs';
import { ThemeContext } from 'context';
import { useColorScheme } from 'react-native';

const LoginStack = createStackNavigator();


const LoginNavigator = () => {
  const { colorScheme, colors } = useContext(ThemeContext);




  return (
    <>
      <StatusBar style={colors} />

      <LoginStack.Navigator screenOptions={{
        headerShown: false, animationTypeForReplace: 'push'
      }} >

        <LoginStack.Screen name={PAGE_LOGIN} component={LoginScreen} />
        <LoginStack.Screen name={PAGE_REGISTER} component={RegisterScreen} />
        <LoginStack.Screen name={PAGE_RESET_PASSWORD} component={ResetPasswordScreen} />
      </LoginStack.Navigator>
    </>
  );
};

export default LoginNavigator;
