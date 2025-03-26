import { Text, View, Button, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { TextInputLogin } from '../../components';
import { StringConstants } from '../../configs';
import { StyleLogin } from '../../styles';
import { SetStateAction, useContext, useEffect, useState } from 'react';

import { ToastAndroid } from 'react-native';

import { DataContext } from '../../context';
import { Link, Redirect, router } from 'expo-router';
import { TextInput } from 'react-native-paper';
import { useCommonData } from '../../services';
import { useAuth } from '../../context/AuthContext';
import { LoginCheckPostBody } from '../../api/model';
import { loginCheckPost } from '../../api/generated/helloAPIPlatform';


import { Formik } from 'formik';
import * as yup from 'yup';
import CustomTextInput from '../../components/CustomTextInput';
import { storeData } from '../../utils/asyncStorage';
import { LOCAL_STORAGE_KEY_TOKEN } from '../../constants/Common';
import { ROUTES } from '../../constants/Routes';


export function showToast(text, duration = 500) {
    ToastAndroid.show(text, duration)
}

export default function LoginScreen() {


    interface FormLogin {
        email: string,
        password: string
    }
    const schema = yup.object().shape({
        email: yup.string().email('Invalid email').required('Required'),
        password: yup.string().required('Required')
    });


    const onSubmit = async (values: FormLogin) => {
        setIsLoading(true);
        try {

            const response = await loginCheckPost({ email: values.email, password: values.password });
            if (response?.token) {
                await storeData(LOCAL_STORAGE_KEY_TOKEN,response.token)

                router.navigate(ROUTES.PAGE_SEARCH)
            }
        } catch (err) {
            console.log("Invalid credeentials")

        } finally {
            setIsLoading(false);
        }
    };



    const { t } = useTranslation();

    const { signIn, setIsLoading, isLoading } = useAuth();


    const { colorScheme, colors } = useCommonData()


    const style = StyleLogin({ colorScheme, colors })


    return (

        <View style={style.container}>
            <Text style={style.title}>{t(StringConstants.login)}</Text>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={schema}
                onSubmit={onSubmit}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View>
                        <CustomTextInput
                            autoComplete="email"
                            placeholder={t(StringConstants.email)}
                            value={values.email}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            error={errors.email}
                            errorStyle={{ color: colors.warning }}
                        />
                        <CustomTextInput
                            autoComplete="off"
                            placeholder={t(StringConstants.password)}
                            value={values.password}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            error={errors.password}
                            errorStyle={{ color: colors.warning }}
                        />

                        <Button title={t(StringConstants.enter)}
                            disabled={isLoading}
                            onPress={() => handleSubmit()} />

                        <Link href='/screenLogin/ResetPasswordScreen' asChild>
                            <Button
                                title={t(StringConstants.forgetPassword)}
                                disabled={isLoading}
                            />
                        </Link>

                        <Link href='/screenLogin/RegisterScreen' asChild>

                            <Button
                                title={t(StringConstants.register)}
                                disabled={isLoading}
                            />
                        </Link>
                    </View>

                )}
            </Formik>
        </View>




    );
}


