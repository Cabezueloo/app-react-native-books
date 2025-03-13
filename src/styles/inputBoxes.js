import { ThemeContext } from "context";
import { lightColors,darkColors, fonts } from "configs";
import {StyleSheet} from 'react-native'
import { useContext } from "react";

export const BasicInput = () => {

    const { colorScheme, colors } = useContext(ThemeContext);
    colors = (colorScheme == "dark") ? lightColors : darkColors;
    
    return StyleSheet.create({
        fonts: fonts.regular,
        height: 40,
        textSize: 16,
        margin: 12,
        fontSize: 16,
        color: '#3498DB',        
        });
};