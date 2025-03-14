import { Text, View, Button, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation, } from '@react-navigation/native';
import { TextInputLogin, CustomButtonOne } from 'app/components';
import { PAGE_LOGIN, PAGE_RESET_PASSWORD, StringConstants, TABLE_USER } from 'app/configs';
import { StyleLogin } from 'app/styles';
import { useState, useContext } from 'react';
import { DataContext, ThemeContext } from 'app/context';
import { supabase } from 'app/services/supabase';
import generateDigest from 'app/services/crypto';

const RegisterScreen = ({ route }) => {
    console.log("ENTRA REGISTER SCREEN")
    const { t } = useTranslation();
    const navigation = useNavigation();

    const { value } = route.params.mailValue
    const { colorScheme, colors } = useContext(DataContext)

    const style = StyleLogin({ colorScheme, colors })

    // inputs y datos de Supabase y comunicar con hijos
    const [mailValue, setMailValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [surnameValue, setSurnameValue] = useState('');
    const [usernameValue, setUsernameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [passwordConfirmationValue, setPasswordConfirmationValue] = useState('');
    const [loading, setLoading] = useState(false)

    //REGISTER
    
    //Register function
    async function signUpWithEmail() {
        setLoading(true)

        //Check if the username doesn't exist in database
        const { data, errorGet } = await supabase
            .from(TABLE_USER)
            .select('username')
            .eq('username', usernameValue.toLocaleLowerCase())


        //TODO check same passwords, lenght ...
        
        //If doesn't exist the username, continue
        if (Object.keys(data).length == 0) {
            console.log("username correcto")
            
            const digest = await generateDigest(passwordValue)
            //Sing Up, auth supabase
            const {
                data: { session },
                error,
            } = await supabase.auth.signUp({
                email: mailValue,
                password: digest,
            })

            if (error) {
                console.log(error.message)
            }

            //Create account in database
            else {

                const { data: { user } } = await supabase.auth.getUser()
                console.log('User ID:', user.id);
                const date = new Date().toISOString()
                
                //Insert the new Table User
                const { data, error } = await supabase
                    .from('User')
                    .insert([
                        {
                            id: user.id,
                            username: usernameValue.toLocaleLowerCase(),
                            email: mailValue,
                            name: usernameValue,
                            surname: surnameValue,
                            password: digest,
                            created_at: date,
                            last_login: date
                        }
                    ]).select()

                if (error) {
                    console.error('Error inserting user data:', error);
                } else {
                    //TODO Enter to the home
                    console.log('User data inserted:', data);
                }
            }
        }
        else {
            console.log("username incorrecto")
        }
        
        //Activate buttons
        setLoading(false)
    }





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

                placeholderText={t(StringConstants.username)}

                onChange={newText => setUsernameValue(newText)}
            />

            <TextInputLogin

                placeholderText={t(StringConstants.name)}

                onChange={newText => setNameValue(newText)}
            />

            <TextInputLogin

                placeholderText={t(StringConstants.surname)}

                onChange={newText => setSurnameValue(newText)}
            />


            <TextInputLogin
                secureTextEntry
                placeholderText={t(StringConstants.password)}
                onChange={newText => setPasswordValue(newText)}
            />

            <TextInputLogin
                secureTextEntry
                placeholderText={t(StringConstants.confirmPassword)}
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
                onPress={() => navigation.navigate(PAGE_LOGIN)
                }
            />

        </View>
    );
};

export default RegisterScreen;