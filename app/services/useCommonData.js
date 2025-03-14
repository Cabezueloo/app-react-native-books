import {useColorScheme} from 'react-native';
import { lightColors, darkColors } from '../styles';
import { supabase } from './supabase';
import { TABLE_USER } from '../configs';
import { useEffect, useState } from 'react';


const useCommonData = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [userDataInDataBase, setUserDataInDataBase] = useState([]);
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? darkColors : lightColors;

  useEffect(() => {
    async function fetchUserData() {
      // Obtiene la sesión actual
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        setIsLogged(false);
        setUserDataInDataBase([]);
        return;
      }
      setIsLogged(true);

      // Consulta a la tabla de usuarios usando el email
      const { data: userData, error: dbError } = await supabase
        .from(TABLE_USER)
        .select()
        .eq('email', data.user.email)
        .single(); // asumiendo que el email es único

      if (dbError) {
        console.error("Error al obtener datos del usuario:", dbError);
        setUserDataInDataBase([]);
      } else {
        setUserDataInDataBase(userData);
      }
    }
    fetchUserData();
  }, []);

  return { colorScheme, colors, isLogged, userDataInDataBase };
};


export default useCommonData;
