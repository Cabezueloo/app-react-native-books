import {Button,  Alert } from 'react-native';
import { useTranslation } from 'react-i18next';

import {StringConstants} from '../../configs'
import {  useState } from 'react';
import { Link } from 'expo-router';

import { ROUTES } from '../../constants/Routes';
import { ThemedView } from '../../components/ThemedView';
import CustomTextInput from '../../components/CustomTextInput';
import { ThemedText } from '../../components/ThemedText';
import { useAuthAndStyle } from '../../context/Context';


const ResetPasswordScreen = () => {
    const {colorScheme, colors} = useAuthAndStyle()
    const {t} = useTranslation();
    
    
    const [resetMail,setResetMail] = useState('')


    return (
            <ThemedView type='container'>
                <ThemedText type='title'>{t(StringConstants.forgetPassword)}</ThemedText>
                
                <CustomTextInput
                            autoComplete="email"
                            placeholder={t(StringConstants.mailRecovery)}
                            onChangeText={ (newText) => setResetMail(newText)}
                            placeholderTextColor={colors.text}
                            style={{color:colors.text}}
                                                       
                            errorStyle={{ color: colors.warning }}
                        />
                 <Button
                            title= {"Enviar correo de confirmación"}
                            onPress={() => Alert.alert(t(StringConstants.enter))}
                            color={colors.accent}
                        />
                
                
                <Link href={ROUTES.PAGE_LOGIN} asChild>
                <Button 
                title={t(StringConstants.backLogin)}
                
                />
                </Link>
            </ThemedView>
        );
}

export default ResetPasswordScreen