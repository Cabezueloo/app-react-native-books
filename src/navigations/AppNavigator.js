// src/navigation/AppNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

const AppNavigator = (userData) => {
  
  console.log("ENTRA APP NAVIGATOR")
  console.log(userData)
  
  return (
    <Tab.Navigator>
      
    </Tab.Navigator>
  );
};

export default AppNavigator;

