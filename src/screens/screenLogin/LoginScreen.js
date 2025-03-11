import {Text, useColorScheme, View,Button } from 'react-native';
import { useTranslation } from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {TextInputLogin,CustomButtonOne} from '@components';
import {StyleLogin, StringConstants} from '@config';


const LoginScreen = () => {
    
    
    const {t} = useTranslation();
    let style = StyleLogin();

    const navigation = useNavigation();

    return (
        <View style={style.container}>
            <Text style={style.title}>{t(StringConstants.login)}</Text>
            <TextInputLogin placeholderText={t(StringConstants.username)}/>
            <TextInputLogin placeholderText={t(StringConstants.password)}/>
            <CustomButtonOne text={t(StringConstants.enter)}/>
            <Button 
            title={t(StringConstants.forgetPassword)}
            onPress={() => navigation.navigate('Reset')}
            />
        </View>
    );
}

export default LoginScreen;