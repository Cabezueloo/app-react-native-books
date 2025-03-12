import { TextInput, useColorScheme} from 'react-native';

import {StyleLogin} from 'configs';
import { CommonDataManager } from 'services';

const TextInputLogin = (props) => {

    
    let cdm = new CommonDataManager()
    
    let style = StyleLogin(cdm.getColorScheme());
    

    
    return (
        <TextInput
            style={style.input}
            placeholder={props.placeholderText}
            placeholderTextColor={cdm.getColors().text}
        ></TextInput>
    );

};

export default TextInputLogin;