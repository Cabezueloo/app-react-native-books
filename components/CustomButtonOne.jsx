import { Button, Alert } from "react-native"


import { useContext } from "react";
import { useCommonData } from "../services";

const CustomButtonOne = (props) => {
    console.log("ENTRA CUSTOM BUTTON ONE")
    const { colorScheme, colors } = useCommonData();
    
    return (
        <Button
            title= {"f"}
            onPress={() => Alert.alert('Simple Button pressed')}
            color={colors.accent}
        />
    )
}

export default CustomButtonOne;