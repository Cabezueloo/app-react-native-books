// src/navigation/AuthNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {LoginScreen} from 'screens';
import {ResetPasswordScreen} from 'screens';

const LoginStack = createStackNavigator();

const LoginNavigator = () => {
  return (
    <LoginStack.Navigator screenOptions={{ headerShown: false }}>
      <LoginStack.Screen name="Login" component={LoginScreen} />
      <LoginStack.Screen name="Reset" component={ResetPasswordScreen} />
    </LoginStack.Navigator>
  );
};

export default LoginNavigator;
