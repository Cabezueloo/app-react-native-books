import { Text, View, Button, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { TextInputLogin, CustomButtonOne } from '../components';
import { PAGE_REGISTER, PAGE_RESET_PASSWORD, StringConstants, TABLE_USER } from '../configs';
import { StyleLogin } from '../styles';
import { useContext, useEffect, useState } from 'react';

import { DataContext } from '../context';
import { supabase } from '../services/supabase';
import { generateDigest } from '../services/crypto';
import AppNavigator from '../navigations/AppNavigator';
import { ToastAndroid } from 'react-native';





export default function LoginScreen()  {

    console.log("ENTRA  SCREEN")

    const { t } = useTranslation();

    // Estados
    const [userOrMailValue, setUserOrMailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('');

    const [userSupabase, setUserSupabase] = useState(null)
    const [isLogged, setIsLogged] = useState(false)

    const { colorScheme, colors } = useContext(DataContext)

    const style = StyleLogin({ colorScheme, colors })

    function showToast(text, duration = 500) {
        ToastAndroid.show(text, duration)
    }

    async function login() {
        //Disable buttons
        setLoading(true)

        //Check if we need to eq by mail or username
        const valueSearch = userOrMailValue.includes('@') ? "email" : "username"

        //Select to check if the mail or username exist
        const { data, error } = await supabase.from(TABLE_USER).select().eq(valueSearch, userOrMailValue.toLocaleLowerCase())

        const values = (Object.values(data))
        const useDataInDataBase = values[0]

        if (values.length == 0)showToast('Incorrect data')
        
        //Check the password
        else {
            console.log("Sí existe")
            console.log("Check -> ", useDataInDataBase.email)
            const usernamePasswordInDataBase = useDataInDataBase.password

            //Cryptho the input pass
            const digest = await generateDigest(passwordValue)

            //Same password, Login in the home
            if (usernamePasswordInDataBase === digest) {

                let emailInDataBase = useDataInDataBase.email

                const { error } = await supabase.auth.signInWithPassword({
                    email: emailInDataBase,
                    password: digest,
                })

                if (error) { Alert.alert(error.message) }

                else {

                    showToast('Welcome')
                    setUserSupabase(useDataInDataBase)
                    setIsLogged(true)
                }

            } 
            else {
                showToast('Incorrect data')
            }
        }

        if (error) { Alert.alert(error.message) }


        setLoading(false)
    }

    if (isLogged) {

        return <AppNavigator userData={userSupabase} />

    }
    else {


        return (


            <View style={style.container}>
                <Text style={style.title}>{t(StringConstants.login)}</Text>
                <TextInputLogin
                    autoComplete="email"
                    placeholderText={t(StringConstants.username_or_email)}
                    value={userOrMailValue}
                    onChange={newText => setUserOrMailValue(newText)}
                />
                <TextInputLogin
                    secureTextEntry
                    placeholderText={t(StringConstants.password)}
                    value={passwordValue}
                    onChange={newText => setPasswordValue(newText)}
                />

                <Button title={t(StringConstants.enter)}
                    disabled={loading}
                    onPress={() => login()} />

                <Button
                    title={t(StringConstants.forgetPassword)}
                    disabled={loading}
                    onPress={() =>{
                        console.log("p")
                        
                        }
                    }
                />
                <Button
                    title={t(StringConstants.register)}
                    disabled={loading}
                    onPress={() =>{
                        console.log("p")
                        
                        }
                    }
                />
            </View>
        );
    }
};