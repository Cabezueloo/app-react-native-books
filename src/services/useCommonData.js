import {useColorScheme} from 'react-native';
import { lightColors, darkColors } from 'styles';

const useCommonData = () => {
  console.log("ENTRA USE COMMON DATA SCREEN")
  const colorScheme = useColorScheme();
  //const colorScheme = 'dark';
  const colors = colorScheme === 'dark' ? darkColors : lightColors;
  return { colorScheme, colors };
};

export default useCommonData;
