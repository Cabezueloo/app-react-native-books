import { useEffect, useState } from 'react';

import { View,Text, Button } from 'react-native';
import { useAuth } from '../../../context/AuthContext';
const HomeScreen = () => {
  
const {signOut} = useAuth()

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Search</Text>

      <Button title='Sign out' onPress={signOut}/>
    </View>
  );
};

export default HomeScreen;
