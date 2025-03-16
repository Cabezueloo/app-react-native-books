import {Text, Button, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import {StackActions, useNavigation} from '@react-navigation/native';

import {TextInputLogin,CustomButtonOne} from '@components';
import {StyleLogin} from '@styles';
import {StringConstants,PAGE_RESET_PASSWORD, PAGE_LOGIN} from '@configs'
import { useContext, useState } from 'react';
import { DataContext, ThemeContext } from '@contexts';
import { Link } from 'expo-router';



const ResetPasswordScreen = ({route}) => {
    console.log("ENTRA RESET PASSWORD SCREEN")
    const {t} = useTranslation();
    
    

    const {colorScheme,colors} = useContext(DataContext)
    
    const style = StyleLogin({colorScheme,colors})

    
    const [resetMail,setResetMail] = useState('')

    return (
            <View style={style.container} sharedT>
                <Text style={style.title}>{t(StringConstants.forgetPassword)}</Text>
                <TextInputLogin placeholderText={t(StringConstants.mailRecovery)} value={resetMail} onChange={ (newText) => setResetMail(newText)}/>
                
                <CustomButtonOne text={t(StringConstants.enter)}/>
                
                <Link href={'/screenLogin/'} asChild>
                <Button 
                title={t(StringConstants.backLogin)}
                
                />
                </Link>
            </View>
        );
}

export default ResetPasswordScreen