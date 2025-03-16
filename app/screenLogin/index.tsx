import { Text, View, Button, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { TextInputLogin } from '@components';
import { PAGE_REGISTER, PAGE_RESET_PASSWORD, StringConstants, TABLE_USER } from '@configs';
import { StyleLogin } from '@styles';
import { SetStateAction, useContext, useEffect, useState } from 'react';

import { supabase, generateDigest } from '@services';
import AppNavigator from '../navigations/AppNavigator';
import { ToastAndroid } from 'react-native';

import { DataContext } from '@contexts';
import { Link } from 'expo-router';
import login from 'auth';




export function showToast(text, duration = 500) {
    ToastAndroid.show(text, duration)
}

export default function LoginScreen() {

    console.log("ENTRA  SCREEN")

    const { t } = useTranslation();

    // Estados
    const [userOrMailValue, setUserOrMailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('');
    console.log(useContext(DataContext))
    const [userDataBase, setUserDataBase] = useState(null)
    

    const { colorScheme, colors,isLogged,userDataInDataBase } = useContext(DataContext)
    //const [isLogged,setIsLogged] = useState(false)
    
    const style = StyleLogin({ colorScheme, colors })

    


    if (isLogged) {

        return <AppNavigator userData={userDataBase} />

    }
    else {


        return (


            <View style={style.container}>
                <Text style={style.title}>{t(StringConstants.login)}</Text>
                <TextInputLogin
                    autoComplete="email"
                    placeholderText={t(StringConstants.username_or_email)}
                    value={userOrMailValue}
                    onChange={(newText: SetStateAction<string>) => setUserOrMailValue(newText)}
                />
                <TextInputLogin
                    secureTextEntry
                    placeholderText={t(StringConstants.password)}
                    value={passwordValue}
                    onChange={newText => setPasswordValue(newText)}
                />

                <Button title={t(StringConstants.enter)}
                    disabled={loading}
                    onPress={() => {
                        setLoading(true)
                        login(userOrMailValue,passwordValue,setUserDataBase)
                        setLoading(false)
                    }
                    } />

                <Link href='/screenLogin/ResetPasswordScreen' asChild>
                    <Button
                        title={t(StringConstants.forgetPassword)}
                        disabled={loading}
                    />
                </Link>

                <Link href='/screenLogin/RegisterScreen' asChild>

                    <Button
                        title={t(StringConstants.register)}
                        disabled={loading}
                        onPress={() => {
                            console.log("p")

                        }
                        }
                    />
                </Link>

            </View>
        );
    }
};

