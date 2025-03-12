import { useColorScheme } from "react-native";
import {lightColors,darkColors} from 'styles';

export default class CommonDataManager {
    //cdm -> CommonDataManager
    static myInstance = null;


    _colorScheme = useColorScheme()
    _colors = this.getColorScheme() === 'dark' ? darkColors : lightColors;

    /**
     * @returns {CommonDataManager}
     */

    static getInstance(){
        if(CommonDataManager.myInstance == null){
            CommonDataManager.myInstance = new CommonDataManager();
        }
        return this.myInstance;
    }

    getColors(){
        return this._colors;
    }
    getColorScheme(){
        return this._colorScheme;
    }
}