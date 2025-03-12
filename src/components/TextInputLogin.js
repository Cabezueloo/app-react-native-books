import { TextInput, useColorScheme} from 'react-native';

import {StyleLogin} from 'styles';
import { CommonDataManager } from 'services';


const TextInputLogin = (props) => {

    
    let cdm = new CommonDataManager()
    
    let style = StyleLogin(cdm.getColorScheme());
    //Se comunica con el padre, así poder acceder a el value ya que es un componente personalizado
    const {value, onChange} = props;

    
    return (
        <TextInput
            autoComplete={props.autoComplete}
            style={style.input}
            placeholder={props.placeholderText}
            onChangeText={text => onChange(text)}
            value={value}
            placeholderTextColor={cdm.getColors().text}
            secureTextEntry={props.secureTextEntry}
        ></TextInput>
    );

};

export default TextInputLogin;