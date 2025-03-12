// src/navigation/AuthNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {LoginScreen,ResetPasswordScreen,RegisterScreen} from 'screens';

import { StatusBar } from 'expo-status-bar';
import { CommonDataManager } from 'services';
import { PAGE_LOGIN,PAGE_REGISTER,PAGE_RESET_PASSWORD } from 'configs';


const LoginStack = createStackNavigator();

const LoginNavigator = () => {
  const color = new CommonDataManager().getColorScheme()==='dark' ?'light' :'dark'
  return (
    <>
    <StatusBar style={color} />
    
    <LoginStack.Navigator screenOptions={{ headerShown: false, animationTypeForReplace:'push'
}} >
      
      <LoginStack.Screen name={PAGE_LOGIN} component={LoginScreen} />
      <LoginStack.Screen name={PAGE_REGISTER} component={RegisterScreen} />
    <LoginStack.Screen name={PAGE_RESET_PASSWORD} component={ResetPasswordScreen} />
    </LoginStack.Navigator>
    </>
  );
};

export default LoginNavigator;
