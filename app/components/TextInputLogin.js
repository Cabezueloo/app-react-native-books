import { TextInput} from 'react-native';

import {StyleLogin} from 'app/styles';
import { DataContext } from 'app/context';
import { useContext } from 'react';


const TextInputLogin = (props) => {
    console.log("ENTRA TEXT INPUT LOGIN")
    
    const { colorScheme, colors } = useContext(DataContext);
    
    
    let style = StyleLogin({colorScheme,colors});
    //Se comunica con el padre, así poder acceder a el value ya que es un componente personalizado
    const {value, onChange} = props;

    
    return (
        <TextInput
            autoComplete={props.autoComplete}
            style={style.input}
            placeholder={props.placeholderText}
            onChangeText={text => onChange(text)}
            value={value}
            placeholderTextColor={colors.text}
            secureTextEntry={props.secureTextEntry}
        ></TextInput>
    );

};

export default TextInputLogin;