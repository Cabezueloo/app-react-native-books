import {useColorScheme} from 'react-native';
import { lightColors, darkColors } from '../styles';

import { TABLE_USER } from '../configs';
import { useEffect, useState } from 'react';


const useCommonData = () => {
  const [isLogged, setIsLogged] = useState(false);
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? darkColors : lightColors;

  
  return { colorScheme, colors, isLogged, setIsLogged,};
};


export default useCommonData;
