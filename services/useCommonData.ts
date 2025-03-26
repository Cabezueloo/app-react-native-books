import {useColorScheme} from 'react-native';
import { lightColors, darkColors } from '../styles';

const useCommonData = () => {
  const colorScheme = useColorScheme();
  const colors = colorScheme === 'dark' ? darkColors : lightColors;

  return { colorScheme, colors};
};


export default useCommonData;
