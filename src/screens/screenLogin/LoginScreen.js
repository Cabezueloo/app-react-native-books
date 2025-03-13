import { Text, View, Button, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation, } from '@react-navigation/native';
import { TextInputLogin, CustomButtonOne } from 'components';
import { PAGE_REGISTER, PAGE_RESET_PASSWORD, StringConstants, TABLE_USER } from 'configs';
import { StyleLogin } from 'styles';
import { useContext, useEffect, useState } from 'react';



import { ThemeContext } from 'context';
import { supabase } from 'services/supabase';
import { generateDigest } from 'services/crypto';





const LoginScreen = () => {

    console.log("ENTRA LOGIN SCREEN")


    async function login() {
        setLoading(true)
        
        const valueSearch = mailValue.includes('@') ? "email":"username"

        const { data, error } = await supabase.from(TABLE_USER).select("password").eq(valueSearch,mailValue.toLocaleLowerCase())
        const values = Object.values(data)
        if (values.length == 0) {
        console.log("No existe")

        }else{
            console.log("Sí existe")

            const usernamePassword = values[0].password
            console.log("Datbase ->", usernamePassword)

            const digest = await generateDigest(usernamePassword)
            console.log("Introducida ->", digest)

            
            if(usernamePassword === digest){
                console.log("Entrar al home")
            }else{
                console.log("Valores incorrectos")
            }
        }

        if (error) { Alert.alert(error.message) }


        setLoading(false)
    }


    const { t } = useTranslation();
    const navigation = useNavigation();

    // Estados para inputs y datos de Supabase
    const [mailValue, setMailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);

    const { colorScheme, colors } = useContext(ThemeContext)

    const style = StyleLogin({ colorScheme, colors })

    // Realizamos la consulta a Supabase cuando se monta el componente

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase.from('User').select();
            if (error) {
                console.error("PETA")
                console.error(error)
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
                placeholderText={t(StringConstants.username_or_email)}
                value={mailValue}
                onChange={newText => setMailValue(newText)}
            />
            <TextInputLogin
                secureTextEntry
                placeholderText={t(StringConstants.password)}
                value={passwordValue}
                onChange={newText => setPasswordValue(newText)}
            />
            
            <Button title={t(StringConstants.enter)}
                disabled={loading}
                onPress={()=>login()} />

            <Button
                title={t(StringConstants.forgetPassword)}
                disabled={loading}
                onPress={() =>
                    navigation.navigate(PAGE_RESET_PASSWORD, {
                        mailValue: mailValue
                    })
                }
            />
            <Button
                title={t(StringConstants.register)}
                disabled={loading}
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