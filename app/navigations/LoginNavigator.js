// src/navigation/AuthNavigator.js
import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, ResetPasswordScreen, RegisterScreen } from 'app/screens';

import { StatusBar } from 'expo-status-bar';

import {PAGE_LOGIN, PAGE_REGISTER, PAGE_RESET_PASSWORD } from 'app/configs';
import { DataContext } from 'app/context';

const LoginStack = createStackNavigator();


const LoginNavigator = () => {
  console.log("ENTRA LOGIN NAVIGATOR")
  const { colorScheme, colors } = useContext(DataContext);

  return (
    <>
      <StatusBar style={colors} />

      <LoginStack.Navigator screenOptions={{
        animation:'fade',
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
