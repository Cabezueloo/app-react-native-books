// src/navigation/AuthNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {LoginScreen} from 'screens';
import {ResetPasswordScreen} from 'screens';
import { StatusBar } from 'expo-status-bar';
import { CommonDataManager } from 'services';

const LoginStack = createStackNavigator();

const LoginNavigator = () => {
  const color = new CommonDataManager().getColorScheme()==='dark' ?'light' :'dark'
  return (
    <>
    <StatusBar style={color} />
    
    <LoginStack.Navigator screenOptions={{ headerShown: false }}>
      
      <LoginStack.Screen name="Login" component={LoginScreen} />
      <LoginStack.Screen name="Reset" component={ResetPasswordScreen} />
    </LoginStack.Navigator>
    </>
  );
};

export default LoginNavigator;
