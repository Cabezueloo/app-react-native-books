import { TextInput, useColorScheme} from 'react-native';

import { lightColors,darkColors,StyleLogin} from '@config';

const TextInputLogin = (props) => {

    let colorScheme = useColorScheme();
    let style = StyleLogin(colorScheme);
    const colors = colorScheme === 'dark' ? darkColors : lightColors;
    
    return (
        <TextInput
            style={style.input}
            placeholder={props.placeholderText}
            placeholderTextColor={colors.text}
        ></TextInput>
    );

};

export default TextInputLogin;