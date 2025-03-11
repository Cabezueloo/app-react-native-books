import { Button, Alert } from "react-native"

import {CommonDataManager} from "@service";

const CustomButtonOne = (props) => {

    let cdm =new CommonDataManager()
    
    return (
        <Button
            title= {props.text}
            onPress={() => Alert.alert('Simple Button pressed')}
            color={cdm._colors.accent}
        />
    )
}

export default CustomButtonOne;