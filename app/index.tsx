//import { PAGE_HOME, PAGE_LOGIN, PAGE_REGISTER, PAGE_RESET_PASSWORD } from '@config';
import {useCommonData} from '@services';
import { darkColors, lightColors, StyleLogin } from '@styles';
import { Redirect} from 'expo-router'
import {  useEffect, useState, } from 'react';
import { Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { StringConstants } from '@configs';
import { PaperProvider } from 'react-native-paper';

export default function Start() {
  
  console.log("ENTRA START")
  const {t} = useTranslation()

  
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const { colorScheme, colors, isLogged, userDataInDataBase } = useCommonData()

  const style = StyleLogin({ colorScheme, colors })
  const spinnerColor = colorScheme == 'dark' ? lightColors.background : darkColors.background
  useEffect(() => {
    setTimeout(() => {

      if (isLogged) {
        setUserData(userDataInDataBase)
      }
      setLoading(false)
    }, 2000)
  },[isLogged])

console.log("isLogged -> ",isLogged)

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