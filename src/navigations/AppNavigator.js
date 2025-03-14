// src/navigation/AppNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

const AppNavigator = (props) => {
  
  console.log("ENTRA APP NAVIGATOR")
  console.log(props.user)
  
  return (
    <Tab.Navigator>
      
    </Tab.Navigator>
  );
};

export default AppNavigator;

