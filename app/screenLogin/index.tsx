import { Text, View, Button, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { TextInputLogin } from '../../components';
import { StringConstants } from '../../configs';
import { StyleLogin } from '../../styles';
import { SetStateAction, useContext, useEffect, useState } from 'react';

import { ToastAndroid } from 'react-native';

import { DataContext } from '../../context';
import { Link, Redirect } from 'expo-router';
import { TextInput } from 'react-native-paper';
import { useCommonData } from '../../services';
import { useAuth } from '../../context/AuthContext';
import { LoginCheckPostBody } from '../../api/model';
import { loginCheckPost } from '../../api/generated/helloAPIPlatform';




export function showToast(text, duration = 500) {
    ToastAndroid.show(text, duration)
}

export default function LoginScreen() {

    const submitForm = async () => {
        setIsLoading(true);
        try {
          
          const response = await loginCheckPost({email:userEmail,password:passwordValue});
          if (response?.token) {
            console.log("HAY token")
            await signIn(response.token);
          }
        } catch (err) {
          console.log("Invalid credeentials")
          
        } finally {
          setIsLoading(false);
        }
      };



    const { t } = useTranslation();

    const { signIn, setIsLoading, isLoading } = useAuth();

    // Estados
    const [userEmail, setUserOrMailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    
    
    const { colorScheme, colors } = useCommonData()


    const style = StyleLogin({ colorScheme, colors })


    return (


        <View style={style.container}>
            <Text style={style.title}>{t(StringConstants.login)}</Text>

            <TextInputLogin
                autoComplete="email"
                placeholderText={t(StringConstants.mail)}
                value={userEmail}
                onChange={(newText: SetStateAction<string>) => setUserOrMailValue(newText)}
            />
            <TextInputLogin
                secureTextEntry
                placeholderText={t(StringConstants.password)}
                value={passwordValue}
                onChange={newText => setPasswordValue(newText)}
            />

            <Button title={t(StringConstants.enter)}
                disabled={isLoading}
                onPress={() => submitForm()
                } />

            <Link href='/screenLogin/ResetPasswordScreen' asChild>
                <Button
                    title={t(StringConstants.forgetPassword)}
                    disabled={isLoading}
                />
            </Link>

            <Link href='/screenLogin/RegisterScreen' asChild>

                <Button
                    title={t(StringConstants.register)}
                    disabled={isLoading}
                />
            </Link>

        </View>
    );
}


