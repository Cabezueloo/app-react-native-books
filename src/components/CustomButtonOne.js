import { Button, useColorScheme, Alert } from "react-native"

import { StyleLogin, StringConstants, lightColors, darkColors } from '@config';

const CustomButtonOne = () => {

    let colorScheme = useColorScheme();

    const colors = colorScheme === 'dark' ? darkColors : lightColors;
    
    return (
        <Button
            title="Test"
            onPress={() => Alert.alert('Simple Button pressed')}
            color={colors.accent}
        />
    )
}

export default CustomButtonOne;