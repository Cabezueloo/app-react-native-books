// src/navigation/AuthNavigator.js
import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {PAGE_LOGIN, PAGE_REGISTER, PAGE_RESET_PASSWORD } from '@configs';
import { DataContext } from '../context/DataContext';
import { Text } from 'react-native';

const LoginStack = createStackNavigator();


const LoginNavigator = () => {
  console.log("ENTRA LOGIN NAVIGATOR")
  
  const { colorScheme, colors,isLogged, userDataInDataBase } = useContext(DataContext);


  return (
   <Text>"LOGIn</Text>
  );
};

export default LoginNavigator;
