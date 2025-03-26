import { useEffect, useState } from 'react';

import { View, Text, Button } from 'react-native';
import { useAuthAndStyle } from '../../../context/Context';
const HomeScreen = () => {

      const { signOut, currentUser, apiMe, isLoading,colors } = useAuthAndStyle()

  useEffect(() => {
    apiMe()
  }, [])

  console.log("Current user en el search ->", currentUser)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:colors.background }}>
      <Text style={{color:colors.text}}>Search</Text>
      <Text style={{color:colors.text}}>{isLoading ? "Cargando..." : currentUser.email}</Text>

      <Button color={colors.primary} title='Sign out' onPress={signOut} />
    </View>
  );
};

export default HomeScreen;
