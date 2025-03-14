//import { PAGE_HOME, PAGE_LOGIN, PAGE_REGISTER, PAGE_RESET_PASSWORD } from '@config';
import  useCommonData  from './services/useCommonData';
import { DataContext } from './context/DataContext';
import { darkColors, lightColors, StyleLogin } from './styles';
import {Stack} from 'expo-router'
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


//Controla qué navegador se muestra según el estado de autenticación
export default function RootLayout() {
  console.log("ENTRA ROOT NAVIGATOR")
  
  const [loading, setLoading] = useState(true)
  const { colorScheme, colors, isLogged, userDataInDataBase } = useCommonData()


  
    const style = StyleLogin({ colorScheme, colors })
    const spinnerColor = colorScheme == 'dark' ? lightColors.background : darkColors.background
  
    if (loading) {
       return (
         <SafeAreaProvider>
   
           <SafeAreaView style={styles({ color: colors.background }).container}>
             <Image
               source={require('./assets/icon.png')}
               style={{resizeMode: "cover"}}
             />
             <Text style={style.basicLabel}>T</Text>
             <ActivityIndicator size={"large"} color={spinnerColor} />
           </SafeAreaView>
         </SafeAreaProvider>
   
       );
     }



};
  
const styles = (props) => StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: props.color,
    justifyContent: "center",
    alignItems: "center",
  }
});
  