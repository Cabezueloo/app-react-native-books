import { Text, View, Button } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation, } from '@react-navigation/native';
import { TextInputLogin, CustomButtonOne } from 'components';
import { PAGE_LOGIN, PAGE_RESET_PASSWORD, StringConstants } from 'configs';
import { StyleLogin } from 'styles';
import { useEffect, useState } from 'react';

import { createClient } from '@supabase/supabase-js'



const style = StyleLogin(); 


const RegisterScreen = ({route}) => {
    const { t } = useTranslation();
    const navigation = useNavigation();
    
    const {value} = route.params.mailValue

    // inputs y datos de Supabase y comunicar con hijos
    const [mailValue, setMailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [passwordConfirmationValue, setPasswordConfirmationValue] = useState('');

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
                value={passwordValue}
                onChange={newText => setPasswordValue(newText)}
            />
            
            <TextInputLogin
                secureTextEntry
                placeholderText={t(StringConstants.password)}
                value={passwordValue}
                onChange={newText => setPasswordConfirmationValue(newText)}
            />

            <CustomButtonOne text={t(StringConstants.create_an_account)} />
            <Button
                title={t(StringConstants.backLogin)}
                onPress={() =>
                    navigation.navigate(PAGE_LOGIN, {
                        mailValue: mailValue
                    })
                }
            />
            
        </View>
    );
};

export default RegisterScreen;