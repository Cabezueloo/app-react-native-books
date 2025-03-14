// src/navigation/AppNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { PAGE_HOME } from 'app/configs';
import HomeScreen from 'app/screens/screenApp/HomeScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = (userData) => {
  
  console.log("ENTRA APP NAVIGATOR")
  console.log(userData)
  
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name={PAGE_HOME} component={HomeScreen} />
      
    </Tab.Navigator>
  );
};

export default AppNavigator;

