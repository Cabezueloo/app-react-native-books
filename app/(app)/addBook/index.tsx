import { Button, Text, View } from "react-native"
import { useAuthAndStyle } from "../../../context/Context"

const AddBookScreen = () => {
  const { signOut, currentUser, apiMe, isLoading,colors } = useAuthAndStyle()

return (


    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:colors.background }}>
            
            <Text style={{color:colors.text}}>Addbook</Text>

    </View>
)

}
export default AddBookScreen