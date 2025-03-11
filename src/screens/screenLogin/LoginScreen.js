import {Text, useColorScheme, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import {TextInputLogin,CustomButtonOne} from '@components';
import {StyleLogin, StringConstants} from '@config';


const LoginScreen = () => {
    
    const {t} = useTranslation();
    let style = StyleLogin(useColorScheme());

    return (
        <View style={style.container}>
            <Text style={style.title}>{t('login')}</Text>
            <TextInputLogin placeholderText={t(StringConstants.username)}/>
            <TextInputLogin placeholderText={t(StringConstants.password)}/>
            <CustomButtonOne/>
        </View>
    );
}

export default LoginScreen;