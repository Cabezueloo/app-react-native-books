import { Button, Alert } from "react-native"

import { ThemeContext } from "context";
import { useContext } from "react";

const CustomButtonOne = (props) => {

    const { colorScheme, colors } = useContext(ThemeContext);
    
    return (
        <Button
            title= {props.text}
            onPress={() => Alert.alert('Simple Button pressed')}
            color={colors.accent}
        />
    )
}

export default CustomButtonOne;