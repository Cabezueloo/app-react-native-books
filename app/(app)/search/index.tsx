import { useEffect, useState } from 'react';

import { View, Text, Button } from 'react-native';
import { useAuthAndStyle } from '../../../context/Context';
const HomeScreen = () => {

  const { signOut, currentUser, apiMe, isLoading } = useAuthAndStyle()

  useEffect(() => {
    apiMe()
  }, [])

  console.log("Current user en el search ->", currentUser)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Search</Text>
      <Text>{isLoading ? "Cargando..." : currentUser.email}</Text>

      <Button title='Sign out' onPress={signOut} />
    </View>
  );
};

export default HomeScreen;
