import { Text, View, Button,Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation, } from '@react-navigation/native';
import { TextInputLogin, CustomButtonOne } from 'components';
import { PAGE_LOGIN, PAGE_RESET_PASSWORD, StringConstants } from 'configs';
import { StyleLogin } from 'styles';
import { useState,useContext } from 'react';
import { ThemeContext } from 'context';
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

    //REGISTER
    async function signInWithEmail() {
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
          email: mailValue,
          password: passwordValue,
        })
    
        if (error) {Alert.alert(error.message)}
        

        setLoading(false)
      }


    async function signUpWithEmail() {
        setLoading(true)
        const {
          data: { session },
          error,
        } = await supabase.auth.signUp({
          email: mailValue,
          password: passwordValue,
        })
    
        if (error) {
            console.log(error.message)
        }
        //Create account in database
        else{
                               
            const { data: { user } } = await supabase.auth.getUser()
            console.log('User ID:', user.id);
            const date = new Date().toISOString()
            //Insert User ID to Table
            const {data, error} = await supabase
            .from('User')
            .insert([
                {
                    id:user.id,username:"Manolo",email:mailValue,name:"ManoloNombre",surname:"Gomez",password:passwordValue,created_at:date,last_login:date
                }
            ])
            if (error) {
                console.error('Error inserting user data:', error);
              } else {
                console.log('User data inserted:', data);
              }
        }
        
        
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