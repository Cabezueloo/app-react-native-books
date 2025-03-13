import {Text, Button, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import {StackActions, useNavigation} from '@react-navigation/native';

import {TextInputLogin,CustomButtonOne} from 'components';
import {StyleLogin} from 'styles';
import {StringConstants,PAGE_RESET_PASSWORD, PAGE_LOGIN} from 'configs'
import { useContext, useState } from 'react';
import { ThemeContext } from 'context';



const ResetPasswordScreen = ({route}) => {
    const {t} = useTranslation();
    
    

    const {colorScheme,colors} = useContext(ThemeContext)
    
    const style = StyleLogin({colorScheme,colors})

    const navigation = useNavigation();
    const mailValue = route.params.mailValue
    
    console.log("Mail value -> ",mailValue)
    const [resetMail,setResetMail] = useState(mailValue!=''?mailValue:'')

    return (
            <View style={style.container} sharedT>
                <Text style={style.title}>{t(StringConstants.forgetPassword)}</Text>
                <TextInputLogin placeholderText={t(StringConstants.mailRecovery)} value={resetMail} onChange={ (newText) => setResetMail(newText)}/>
                
                <CustomButtonOne text={t(StringConstants.enter)}/>
                <Button 
                title={t(StringConstants.backLogin)}
                
                onPress={() => navigation.dispatch(
                    
                    StackActions.replace(PAGE_LOGIN)
                )}
                />
            </View>
        );
}

export default ResetPasswordScreen