import { useEffect, useState } from 'react';
import { supabase } from '../../services';
import { View,Text } from 'react-native';
const HomeScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error al obtener el usuario:", error);
      } else {
        setUser(data.user);
      }
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
