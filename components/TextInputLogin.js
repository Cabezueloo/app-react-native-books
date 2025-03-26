import { TextInput} from 'react-native';

import {StyleLogin} from '../styles';
import { DataContext } from '../context';
import { useContext } from 'react';
import  {useCommonData}  from '../services';


const TextInputLogin = (props) => {
    console.log("ENTRA TEXT INPUT LOGIN")
    
    const { colorScheme, colors } = useCommonData();
    
    
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