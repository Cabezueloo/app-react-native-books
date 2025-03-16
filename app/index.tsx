//import { PAGE_HOME, PAGE_LOGIN, PAGE_REGISTER, PAGE_RESET_PASSWORD } from '@config';
import {useCommonData} from '@services';
import { darkColors, lightColors, StyleLogin } from '@styles';
import { Redirect} from 'expo-router'
import {  useEffect, useState, } from 'react';
import { Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { StringConstants } from '@configs';

export default function Start() {
  
  console.log("ENTRA START")
  const {t} = useTranslation()

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const { colorScheme, colors, isLogged, userDataInDataBase } = useCommonData()

  const style = StyleLogin({ colorScheme, colors })
  const spinnerColor = colorScheme == 'dark' ? lightColors.background : darkColors.background
  useEffect(() => {
    setTimeout(() => {

      setIsAuthenticated(isLogged)

      if (isLogged) {
        setUserData(userDataInDataBase)
      }
      setLoading(false)
    }, 500)
  })
  if (loading) {
    return (
       <SafeAreaProvider>
     
             <SafeAreaView style={styles({ color: colors.background }).container}>
               <Image
                 source={require('../app/assets/icon.png')}
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
    <SafeAreaProvider>

    <SafeAreaView style={styles({ color: colors.background }).container}>
    {isAuthenticated} ? <Redirect href={'/screenLogin'}/> : <Redirect href={'/screenLogin'}/>
    </SafeAreaView>
    </SafeAreaProvider>

    
  )

};

const styles = (color) => StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: color,
    justifyContent: "center",
    alignItems: "center",
  }
});