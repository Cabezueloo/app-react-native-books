import {Text, Button, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import {StackActions, useNavigation} from '@react-navigation/native';

import {TextInputLogin,CustomButtonOne} from '../../components';
import {StyleLogin} from '../../styles';
import {StringConstants} from '../../configs'
import { useContext, useState } from 'react';
import { Link } from 'expo-router';
import { useCommonData } from '../../services';
import { ROUTES } from '../../constants/Routes';



const ResetPasswordScreen = () => {
    console.log("ENTRA RESET PASSWORD SCREEN")
    const {colorScheme, colors} = useCommonData()
    const {t} = useTranslation();
    
    
    const style = StyleLogin({colorScheme,colors})

    
    const [resetMail,setResetMail] = useState('')

    return (
            <View style={style.container} >
                <Text style={style.title}>{t(StringConstants.forgetPassword)}</Text>
                <TextInputLogin placeholderText={t(StringConstants.mailRecovery)} value={resetMail} onChange={ (newText) => setResetMail(newText)}/>
                
                <CustomButtonOne text={t(StringConstants.enter)}/>
                
                <Link href={ROUTES.PAGE_LOGIN} asChild>
                <Button 
                title={t(StringConstants.backLogin)}
                
                />
                </Link>
            </View>
        );
}

export default ResetPasswordScreen