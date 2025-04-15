import React from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Link, router } from 'expo-router';
import { Formik } from 'formik';
import * as yup from 'yup';

import { StringConstants } from '../../configs';

import CustomTextInput from '../../components/CustomTextInput';
import { apiUsersPost, loginCheckPost } from '../../api/generated/helloAPIPlatform';
import { UserJsonld, UserJsonldUserWrite } from '../../api/model';
import { useAuthAndStyle } from '../../context/Context';
import { ROUTES } from '../../constants/Routes';
import { ThemedView } from '../../components/ThemedView';
import { ThemedText } from '../../components/ThemedText';


interface FormSchemaRegister {
    email: string;
    username: string;
    name: string;
    surname: string;
    password: string;
    confirmPassword: string;
}

const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Required'),
    username: yup.string().required('Required'),
    name: yup.string().required('Required'),
    surname: yup.string().required('Required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
});

const RegisterScreen = () => {
    const { t } = useTranslation();
    const { signIn, apiMe, colors, colorScheme } = useAuthAndStyle()

    const [loading, setLoading] = React.useState(false);

    const onSubmit = async (values: FormSchemaRegister) => {
        console.log("Form values -> ", values);
        const newUser: UserJsonldUserWrite = {
            username: values.username,
            email: values.email,
            name: values.name,
            surname: values.surname,
            password: values.password
        };
        console.log(newUser)
        try {
            const response = await apiUsersPost(newUser)

            const responseLogin = await loginCheckPost({ email: newUser.email, password: newUser.password });

            if (responseLogin?.token) {


                signIn(responseLogin.token)



            }
        } catch (e) {
            console.log(e)
        }

    };

    return (
        <ThemedView type='container'>
            <ThemedText type='title'> {t(StringConstants.register)}</ThemedText>
            <Formik
                initialValues={{
                    email: '',
                    username: '',
                    name: '',
                    surname: '',
                    password: '',
                    confirmPassword: ''
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
                            style={{ color: colors.text }}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            error={errors.email}
                            errorStyle={{ color: colors.warning }}
                        />
                        <CustomTextInput
                            autoComplete="off"
                            placeholder={t(StringConstants.username)}
                            value={values.username}
                            placeholderTextColor={colors.text}
                            style={{ color: colors.text }}
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            error={errors.username}
                            errorStyle={{ color: colors.warning }}
                        />
                        <CustomTextInput
                            autoComplete="name"
                            placeholder={t(StringConstants.name)}
                            value={values.name}
                            placeholderTextColor={colors.text}
                            style={{ color: colors.text }}
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            error={errors.name}
                            errorStyle={{ color: colors.warning }}
                        />
                        <CustomTextInput
                            autoComplete="off"
                            placeholder={t(StringConstants.surname)}
                            value={values.surname}
                            placeholderTextColor={colors.text}
                            style={{ color: colors.text }}
                            onChangeText={handleChange('surname')}
                            onBlur={handleBlur('surname')}
                            error={errors.surname}
                            errorStyle={{ color: colors.warning }}
                        />
                        <CustomTextInput
                            autoComplete="password"
                            placeholder={t(StringConstants.password)}
                            value={values.password}
                            placeholderTextColor={colors.text}
                            style={{ color: colors.text }}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            error={errors.password}
                            errorStyle={{ color: colors.warning }}
                        />

                        <CustomTextInput
                            autoComplete="password"
                            placeholder={t(StringConstants.confirmPassword)}
                            value={values.confirmPassword}
                            placeholderTextColor={colors.text}
                            style={{ color: colors.text }}
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            error={errors.confirmPassword}
                            errorStyle={{ color: colors.warning }}
                        />


                        <Button
                            title={t(StringConstants.create_an_account)}
                            onPress={() => handleSubmit()} // Call handleSubmit without passing any event.
                            color={colors.accent}
                            disabled={loading}
                        />

                        <Link href={ROUTES.PAGE_LOGIN} asChild>
                            <Button
                                title={t(StringConstants.backLogin)}
                                disabled={loading}
                                onPress={() => { }}
                            />
                        </Link>
                    </View>
                )}
            </Formik>
        </ThemedView>
    );
};

export default RegisterScreen;
