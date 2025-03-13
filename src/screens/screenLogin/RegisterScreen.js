import { Text, View, Button,Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation, } from '@react-navigation/native';
import { TextInputLogin, CustomButtonOne } from 'components';
import { PAGE_LOGIN, PAGE_RESET_PASSWORD, StringConstants } from 'configs';
import { StyleLogin } from 'styles';
import { useState,useContext } from 'react';
import { ThemeContext } from 'context';
import { createClient } from '@supabase/supabase-js'
import { supabase } from 'services/supabase';

const RegisterScreen = ({route}) => {
    console.log("ENTRA REGISTER SCREEN")
    const { t } = useTranslation();
    const navigation = useNavigation();
    
    const {value} = route.params.mailValue
    const {colorScheme,colors} = useContext(ThemeContext)
    
    const style = StyleLogin({colorScheme,colors})

    // inputs y datos de Supabase y comunicar con hijos
    const [mailValue, setMailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [passwordConfirmationValue, setPasswordConfirmationValue] = useState('');
    const [loading, setLoading] = useState(false)

    return (
        <View style={style.container}>
            <Text style={style.title}>{t(StringConstants.register)}</Text>
            <TextInputLogin
                autoComplete="email"
                placeholderText={t(StringConstants.mail)}
                value={mailValue}
                onChange={newText => setMailValue(newText)}
            />
            <TextInputLogin
                secureTextEntry
                placeholderText={t(StringConstants.password)}
                onChange={newText => setPasswordValue(newText)}
            />
            
            <TextInputLogin
                secureTextEntry
                placeholderText={t(StringConstants.password)}
                onChange={newText => setPasswordConfirmationValue(newText)}
            />

            <Button 
            title={t(StringConstants.create_an_account)}
             color={colors.accent} 
             disabled={loading}
             onPress={() => signUpWithEmail()}
             
             />
            
            <Button
            
                title={t(StringConstants.backLogin)}
                disabled={loading}
                onPress={() =>navigation.navigate(PAGE_LOGIN)
                }
            />
            
        </View>
    );
};

export default RegisterScreen;