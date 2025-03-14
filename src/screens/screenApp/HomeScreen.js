import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { supabase } from 'services/supabase';

const HomeScreen = () => {
  const [user, setUser] = useState(null); // Inicializamos con null en lugar de false
  const [loading, setLoading] = useState(true);

  // Función asíncrona para obtener el usuario
  async function getUser() {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error("Error al obtener el usuario:", error);
    } else {
      // La estructura depende de cómo devuelve Supabase la información
      // Aquí asumimos que data.user contiene el objeto del usuario
      setUser(data.user);
    }
    setLoading(false);
  }

  // useEffect para ejecutar getUser al montar el componente
  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {loading ? (
        <Text>Cargando...</Text>
      ) : (
        <Text>
          {user ? `Usuario: ${user.email}` : "No se encontró usuario"}
        </Text>
      )}
      <Text>Sale</Text>
    </View>
  );
};

export default HomeScreen;
