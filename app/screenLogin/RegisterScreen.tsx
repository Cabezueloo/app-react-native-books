import { Text, View, Button, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute, } from '@react-navigation/native';
import { TextInputLogin, CustomButtonOne } from '../../components';
import { StringConstants } from '../../configs';
import { StyleLogin } from '../../styles';
import { useState, useContext } from 'react';
import { DataContext} from '../../context';

import {generateDigest, useCommonData} from '../../services';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Link } from 'expo-router';

const RegisterScreen = () => {
    console.log("ENTRA REGISTER SCREEN")
    const { t } = useTranslation();
    
    const { colorScheme, colors } = useCommonData()

    const style = StyleLogin({ colorScheme, colors })

    // inputs y datos de  y comunicar con hijos
    const [mailValue, setMailValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [surnameValue, setSurnameValue] = useState('');
    const [usernameValue, setUsernameValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [passwordConfirmationValue, setPasswordConfirmationValue] = useState('');
    const [loading, setLoading] = useState(false)

    //REGISTER
    
    //Register function
   


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
                onPress={() => {}}

            />
            <Link href='/screenLogin' asChild>
            <Button

                title={t(StringConstants.backLogin)}
                disabled={loading}
                
            />
            </Link>

        </View>
    );
};

export default RegisterScreen;