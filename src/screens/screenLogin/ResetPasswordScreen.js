import {Text, Button, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import {TextInputLogin,CustomButtonOne} from '@components';
import {StyleLogin, StringConstants} from '@config';


const ResetPasswordScreen = () => {
    const {t} = useTranslation();
    let style = StyleLogin();

     return (
            <View style={style.container}>
                <Text style={style.title}>{t(StringConstants.forgetPassword)}</Text>
                <TextInputLogin placeholderText={t(StringConstants.mailRecovery)}/>
                
                <CustomButtonOne text={t(StringConstants.enter)}/>
                <Button 
                title={t(StringConstants.forgetPassword)}
                onPress={() => navigation.navigate('Reset')}
                />
            </View>
        );
}

export default ResetPasswordScreen