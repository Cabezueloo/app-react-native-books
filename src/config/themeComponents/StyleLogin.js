import { StyleSheet } from 'react-native';
import { lightColors,darkColors,size} from '@config'



const StyleLogin = (colorScheme) => {

    
    console.log(colorScheme,"in style view ")

    const colors = colorScheme === 'dark' ? darkColors : lightColors;

    return StyleSheet.create({
        input: {
            height: size.inputBoxes.containerHeight,
            margin: 12,
            fontSize: size.inputBoxes.textSize,
            color: colors.text
        },
        title: {
            fontSize: size.heading,
            color: colors.primary
        },
        container: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.background
            }
    });
    
    

} 

export default StyleLogin;