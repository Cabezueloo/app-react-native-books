import {useColorScheme} from 'react-native';
import { Colors } from '../constants/Colors';

const useCommonData = () => {
  const colorScheme : string = useColorScheme();
  const colors = colorScheme === 'dark' ? Colors.dark : Colors.light;

  return { colorScheme, colors};
};


export default useCommonData;
