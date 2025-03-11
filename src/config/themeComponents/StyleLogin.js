import { StyleSheet } from 'react-native';
import { lightColors,darkColors,size} from '@config'
import { CommonDataManager } from 'services';



const StyleLogin = () => {

    
    const colors = new CommonDataManager().getColorScheme() === 'dark' ? darkColors : lightColors;

    //console.log(colors)
    return StyleSheet.create({
        input: {
            height: size.inputBoxes.containerHeight,
            margin: 12,
            fontSize: size.inputBoxes.textSize,
            color: colors.text,
            placeholderTextColor: colors.text
        },
        title: {
            fontSize: size.heading,
            color: colors.primary
        },
        container: {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                
                backgroundColor: colors.background,
            }
    });
    
    

} 

export default StyleLogin;