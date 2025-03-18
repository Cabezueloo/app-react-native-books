import { Button, Alert } from "react-native"


import { useContext } from "react";
import { DataContext } from "../context";

const CustomButtonOne = (props) => {
    console.log("ENTRA CUSTOM BUTTON ONE")
    const { colorScheme, colors } = useContext(DataContext);
    
    return (
        <Button
            title= {props.text}
            onPress={() => Alert.alert('Simple Button pressed')}
            color={colors.accent}
        />
    )
}

export default CustomButtonOne;