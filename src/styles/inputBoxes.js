import { CommonDataManager } from "services";
import { lightColors,darkColors, fonts } from "configs";
import {StyleSheet} from 'react-native'

export const BasicInput = () => {

    let cdm = new CommonDataManager().getColorScheme()
    let colors = cdm == "dark" ? lightColors : darkColors;
    
    return StyleSheet.create({
        fonts: fonts.regular,
        height: 40,
        textSize: 16,
        margin: 12,
        fontSize: 16,
        color: '#3498DB',        
        });
};