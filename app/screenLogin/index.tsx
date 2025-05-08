import { View, Button } from 'react-native';
import { useTranslation } from 'react-i18next';

import { StringConstants } from '../../configs';

import { Link,router } from 'expo-router';
import { useAuthAndStyle } from '../../context/Context';
import { loginCheckPost } from '../../api/generated/helloAPIPlatform';


import { Formik } from 'formik';
import * as yup from 'yup';
import CustomTextInput from '../../components/CustomTextInput';
import { storeData } from '../../utils/asyncStorage';
import { LOCAL_STORAGE_KEY_TOKEN } from '../../constants/Common';
import { ROUTES } from '../../constants/Routes';
import { toastError, toastSuccess } from '../../utils/toast';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';




export default function LoginScreen() {

    

    interface FormLogin {
        email: string,
        password: string
    }
    const schema = yup.object().shape({
        email: yup.string().email('Correo invalido').required('Requerido'),
        password: yup.string().required('Requerido')
    });


    const onSubmit = async (values: FormLogin) => {
        setIsLoading(true);
        try {

            const response = await loginCheckPost({ email: values.email, password: values.password });
            if (response?.token) {
                await storeData(LOCAL_STORAGE_KEY_TOKEN,response.token)

                toastSuccess("Bienvenido")
                router.navigate(ROUTES.PAGE_SEARCH)
            }
        } catch (err) {
            toastError("Credenciales erroneas")

        } finally {
            setIsLoading(false);
        }
    };



    const { t } = useTranslation();

    const { signIn, setIsLoading, isLoading,colorScheme,colors } = useAuthAndStyle();


    return (

        <ThemedView type='container'>
            <ThemedText type='title'>{t(StringConstants.login)}</ThemedText>
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
                            placeholderTextColor={colors.text}
                            style={{color:colors.text}}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            error={errors.email}
                            errorStyle={{ color: colors.warning }}
                        />
                        <CustomTextInput
                            secureTextEntry
                            showPasswordToggle
                            autoComplete="off"
                            placeholder={t(StringConstants.password)}
                            value={values.password}
                            placeholderTextColor={colors.text}
                            style={{color:colors.text}}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            error={errors.password}
                            errorStyle={{ color: colors.warning }}
                        />

                        <Button 
                        
                        title={t(StringConstants.enter)}
                        color={colors.accent}

                            disabled={isLoading}
                            onPress={() => handleSubmit()} />

                        <Link href={ROUTES.PAGE_RESET_PASSWORD} asChild>
                            <Button
                                title={t(StringConstants.forgetPassword)}
                                disabled={isLoading}
                            />
                        </Link>

                        <Link href={ROUTES.PAGE_REGISTER} asChild>

                            <Button
                                title={t(StringConstants.register)}
                                disabled={isLoading}
                            />
                        </Link>
                    </View>

                )}
            </Formik>
        </ThemedView>




    );
}


