//import { PAGE_HOME, PAGE_LOGIN, PAGE_REGISTER, PAGE_RESET_PASSWORD } from '@config';
import {useCommonData} from '../services';
import { darkColors, lightColors, StyleLogin } from '../styles';
import { Redirect, router} from 'expo-router'
import {  useEffect, useState, } from 'react';
import { Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { StringConstants } from '../configs';
import { PaperProvider } from 'react-native-paper';
import { LoginCheckPostBody } from '../api/model';
import { loginCheckPost } from '../api/generated/helloAPIPlatform';
import { storeData } from '../utils/asyncStorage';
import { LOCAL_STORAGE_KEY_TOKEN } from '../constants/Common';
import { ROUTES } from '../constants/Routes';

export default function Start() {
  
  console.log("ENTRA START")

 
    const submitForm = async (params: LoginCheckPostBody) => {

    
    try {
      
      const response = await loginCheckPost(params);
      if (response?.token) {
        await storeData(LOCAL_STORAGE_KEY_TOKEN, response?.token)
        console.log("Loginr")
        router.navigate("/screenApp")
      }
    } catch (err) {
     console.log(err)
      
    }
  };

  const {t} = useTranslation()

  
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const { colorScheme, colors, isLogged} = useCommonData()

  const style = StyleLogin({ colorScheme, colors })
  const spinnerColor = colorScheme == 'dark' ? lightColors.background : darkColors.background
  useEffect(() => {
    setTimeout(() => {
      submitForm({email:"pepe@example.com",password:"123"})
      
      setLoading(false)
    }, 2000)
  },[isLogged])

console.log("isLogged -> ",isLogged)

  if (loading) {
    return (
       <SafeAreaProvider>
     
             <SafeAreaView style={styles({ color: colors.background }).container}>
               <Image
                 source={require('../assets/icon.png')}
                 style={{    resizeMode: "cover",
                 }}
               />
               <Text style={style.basicLabel}>{t(StringConstants.developedBy)}</Text>
               <ActivityIndicator size={"large"} color={spinnerColor} />
             </SafeAreaView>
           </SafeAreaProvider>

    );
  }

  return (
    <PaperProvider>

    <SafeAreaProvider>

    <SafeAreaView style={styles({ color: colors.background }).container}>
    {isLogged ? <Redirect href={'/screenApp'}/> : <Redirect href={'/screenLogin'}/>}
    </SafeAreaView>
    </SafeAreaProvider>
    </PaperProvider>



    
  )

};

const styles = (props) => StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: props.color,
    justifyContent: "center",
    alignItems: "center",
  }
});