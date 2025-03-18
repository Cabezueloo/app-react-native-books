import { StyleSheet } from 'react-native';
import { fonts} from '.'
import {size} from './theme'


const StyleLogin = (props) => {
    console.log("ENTRA STYLE LOGIN")
    const colorScheme = props.colorScheme
    const colors = props.colors
        
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
        basicLabel: {
            fontSize: size.bodyText,
            color: colors.accent,
            fontStyle: fonts.bold,
            

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