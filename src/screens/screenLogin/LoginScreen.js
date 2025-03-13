import { Text, View, Button } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation, } from '@react-navigation/native';
import { TextInputLogin, CustomButtonOne } from 'components';
import { PAGE_REGISTER, PAGE_RESET_PASSWORD, StringConstants } from 'configs';
import { StyleLogin } from 'styles';
import { useContext, useEffect, useState } from 'react';

import { createClient } from '@supabase/supabase-js'
import { ThemeContext } from 'context';

const apiUrl = process.env.SUPABASEURL
const apiKey = process.env.SUPABASEKEY
const supabase = createClient(apiUrl, apiKey);


const LoginScreen = () => {

    console.log("ENTRA LOGIN SCREEN")
    const { t } = useTranslation();
    const navigation = useNavigation();

    // Estados para inputs y datos de Supabase
    const [mailValue, setMailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const [error, setError] = useState(null);
    
    const {colorScheme,colors} = useContext(ThemeContext)
    
    const style = StyleLogin({colorScheme,colors})

    // Realizamos la consulta a Supabase cuando se monta el componente
    
    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase.from('User').select();
            if (error) {
                setError(error);
            } else {

                console.log(data);
            }
        };

        fetchData();
    }, []);

    return (
        <View style={style.container}>
            <Text style={style.title}>{t(StringConstants.login)}</Text>
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
            <CustomButtonOne text={t(StringConstants.enter)} />
            <Button
                title={t(StringConstants.forgetPassword)}
                onPress={() =>
                    navigation.navigate(PAGE_RESET_PASSWORD, {
                        mailValue: mailValue
                    })
                }
            />
             <Button
                title={t(StringConstants.register)}
                onPress={() =>
                    navigation.navigate(PAGE_REGISTER, {
                        mailValue: mailValue
                    })
                }
            />
        </View>
    );
};

export default LoginScreen;