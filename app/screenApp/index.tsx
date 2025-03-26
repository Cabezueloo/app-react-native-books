import { useEffect, useState } from 'react';

import { View,Text } from 'react-native';
const HomeScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      
      
      setLoading(false);
    };

    fetchUser();
  });


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {user ? <Text>Bienvenido, {user.email}</Text> : <Text>No se encontró usuario</Text>}
    </View>
  );
};

export default HomeScreen;
