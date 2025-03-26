// CustomTextInput.tsx
import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface CustomTextInputProps extends TextInputProps {
    error?: string;
    errorStyle?: object;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
    error,
    errorStyle,
    ...textInputProps
}) => {
    return (
        <View>
            <TextInput {...textInputProps} style={[styles.input, textInputProps.style]} />
            {error && <Text style={[styles.errorText, errorStyle]}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        // Add default styles for your input here if needed
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 4,
        marginTop: 5,
        marginBottom: 5,
        
    },
    errorText: {
        color: 'red', // Default error color, can be overridden with errorStyle prop
        marginTop: 4,
        fontSize: 12,
    },
});

export default CustomTextInput;
