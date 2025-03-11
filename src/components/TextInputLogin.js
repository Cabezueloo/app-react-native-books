import { TextInput, useColorScheme} from 'react-native';

import {StyleLogin} from '@config';

const TextInputLogin = (props) => {

    
    let style = StyleLogin(useColorScheme());

    return (
        <TextInput
            style={style.input}
            placeholder={props.placeholderText}
        ></TextInput>
    );

};

export default TextInputLogin;