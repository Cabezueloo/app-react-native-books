// CustomTextInput.tsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { StringConstants } from '../configs';


interface CustomTextInputProps extends TextInputProps {
  /** Optional error message to display below the input */
  error?: string;
  /** Style override for error text */
  errorStyle?: TextStyle;
  /** If true and secureTextEntry is enabled, shows a toggle button */
  showPasswordToggle?: boolean;
  /** Container style override */
  containerStyle?: ViewStyle;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  error,
  errorStyle,
  secureTextEntry,
  showPasswordToggle = false,
  containerStyle,
  style,
  ...textInputProps
}) => {
  const [isSecure, setIsSecure] = useState(!!secureTextEntry);

  const toggleSecure = () => setIsSecure(prev => !prev);
    const {t} = useTranslation()
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.inputWrapper}>
        <TextInput
          {...textInputProps}
          secureTextEntry={isSecure}
          style={[styles.input, style, secureTextEntry && styles.inputWithToggle]}
        />
        {secureTextEntry && showPasswordToggle && (
          <TouchableOpacity onPress={toggleSecure} style={styles.toggleButton}>
            <Text style={styles.toggleText}>
              {isSecure ? t(StringConstants.show) :t(StringConstants.hide)}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {error ? (
        <Text style={[styles.errorText, errorStyle]}>{error}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  // add right padding when toggle is present
  inputWithToggle: {
    paddingRight: 60,
  },
  toggleButton: {
    position: 'absolute',
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  toggleText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});

export default CustomTextInput;
