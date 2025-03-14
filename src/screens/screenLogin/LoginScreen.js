import { Text, View, Button, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation, } from '@react-navigation/native';
import { TextInputLogin, CustomButtonOne } from 'components';
import {PAGE_REGISTER, PAGE_RESET_PASSWORD, StringConstants, TABLE_USER } from 'configs';
import { StyleLogin } from 'styles';
import { useContext, useEffect, useState } from 'react';

import { ThemeContext } from 'context';
import { supabase } from 'services/supabase';
import { generateDigest } from 'services/crypto';
import AppNavigator from 'navigations/AppNavigator';



const LoginScreen = () => {

    console.log("ENTRA LOGIN SCREEN")


    const { t } = useTranslation();
    const navigation = useNavigation();

    // Estados para inputs y datos de Supabase
    const [userOrMailValue, setUserOrMailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null);
    const [userSupabase, setUserSupabase] = useState(null)
    const [isLogged, setIsLogged] = useState(false)
      
    const { colorScheme, colors } = useContext(ThemeContext)

    const style = StyleLogin({ colorScheme, colors })



    async function login() {
        setLoading(true)

        //Check if we eq by mail or username
        const valueSearch = userOrMailValue.includes('@') ? "email" : "username"

        //Select to check if the mail or username exist
        const { data, error } = await supabase.from(TABLE_USER).select("password").eq(valueSearch, userOrMailValue.toLocaleLowerCase())
        
        console.log(userOrMailValue)

        const values = Object.values(data)

        if (values.length == 0) {
            console.log("No existe")

        } 
        else {
            console.log("Sí existe")

            const usernamePasswordInDataBase = values[0].password
            console.log("Datbase ->", usernamePasswordInDataBase)

            const digest = await generateDigest(passwordValue)
            console.log("Introducida ->", digest)


            if (usernamePasswordInDataBase === digest) {

                let usernameEmail = userOrMailValue

                if (valueSearch == "username") {
                    const { data, error } = await supabase.from(TABLE_USER).select("email").eq(valueSearch, userOrMailValue.toLocaleLowerCase())
                    console.log(data)
                    const valuesE = Object.values(data)
                    usernameEmail = valuesE[0].email
                    console.log(usernameEmail)
                }

                const { error } = await supabase.auth.signInWithPassword({
                    email: usernameEmail,
                    password: digest,
                })

                if (error) { Alert.alert(error.message) } 
                
                else { 
                
                    console.log("Entrar al home") 
                    setUserSupabase((await supabase.from(TABLE_USER).select().eq(valueSearch, userOrMailValue.toLocaleLowerCase())).data)
                    setIsLogged(true)    
                }

                //console.log(Object.values(data)[0].id)
                
                //console.log(data)



            } else {
                console.log("Valores incorrectos")
            }
        }

        if (error) { Alert.alert(error.message) }


        setLoading(false)
    }




    if (isLogged){
        
return  <AppNavigator userData={userSupabase}/>
       
    }
    else{

    
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
                onPress={() =>
                    navigation.navigate(PAGE_RESET_PASSWORD, {
                        userOrMailValue: userOrMailValue
                    })
                }
            />
            <Button
                title={t(StringConstants.register)}
                disabled={loading}
                onPress={() =>
                    navigation.navigate(PAGE_REGISTER, {
                        userOrMailValue: userOrMailValue
                    })
                }
            />
        </View>
    );
}
};

export default LoginScreen;