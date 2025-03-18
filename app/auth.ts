import { TABLE_USER } from "../configs"
import { DataContext } from "../context"
import { generateDigest, supabase, useCommonData } from "../services"
import { Dispatch, SetStateAction, useContext } from "react"
import { Alert } from "react-native"
import { showToast } from "screenLogin"

async function login(userOrMailValue: string, password: string, setUserDataBase: Dispatch<any>, setIsLogged: Dispatch<SetStateAction<boolean>>) {

    
    console.log("Entro")

    //Check if we need to eq by mail or username
    const valueSearch = userOrMailValue.includes('@') ? "email" : "username"

    //Select to check if the mail or username exist
    const { data, error } = await supabase.from(TABLE_USER).select().eq(valueSearch, userOrMailValue.toLocaleLowerCase())

    console.log("tert")
    const values = (Object.values(data))
    const useDataInDataBase = values[0]
    console.log("values.length -> ", values.length )
    
    if (values.length === 0) {
        showToast('Incorrect data')
    }//Check the password
    else {
        console.log("Sí existe")
        console.log("Check -> ", useDataInDataBase.email)
        const usernamePasswordInDataBase = useDataInDataBase.password

        //Cryptho the input pass
        const digest = await generateDigest(password)

        //Same password, Login in the home
        if (usernamePasswordInDataBase === digest) {
            
            let emailInDataBase = useDataInDataBase.email

            const { error } = await supabase.auth.signInWithPassword({
                email: emailInDataBase,
                password: digest,
            })

            if (error) { Alert.alert(error.message) }

            else {

                showToast('Welcome')
                setUserDataBase(useDataInDataBase)
                setIsLogged(true)
            }

        }
        else {
            showToast('Incorrect data')
        }
    }

    if (error) { Alert.alert(error.message) }


    

    
}

export default login