import * as React from 'react';
import {useRef, useState} from 'react';
import {KeyboardTypeOptions, LayoutChangeEvent, StyleProp, View, ViewStyle, Text} from 'react-native';
import {TextInput} from 'react-native-paper';
// @ts-ignore
import Feather from 'react-native-vector-icons/Feather';
import useInputFieldStyles from "../../styles/components/core/inputField";

interface InputFieldProps {
  value?: string;
  onChangeText?: (value: string) => void;
  keyboardType?: KeyboardTypeOptions;
  error?: boolean;
  label?: string;
  isRequired?: boolean;
  placeholder?: string;
  disabled?: boolean;
  secureText?: boolean;
  multiline?: boolean;
  isTrimOnBlur?: boolean;
  style?: StyleProp<ViewStyle>;
}

const InputField: React.FC<InputFieldProps> = ({
      onChangeText = () => {},
      keyboardType,
      isRequired = false,
      value = '',
      label,
      placeholder,
      disabled = false,
      error = false,
      secureText = false,
      multiline = false,
      isTrimOnBlur = false,
      style,
}) => {
  const styles = useInputFieldStyles();
  const text = isTrimOnBlur ? value?.trim() : value;
  const [isSecureText, setSecureText] = useState(secureText);
  const height = multiline ? styles.multilineHeight : styles.height;
  const changeText = (newText: string) => {
    if (disabled) {
    } else {
      onChangeText(newText);
    }
  };

  const labelElement = (
      <Text>
        {label}
        {isRequired && (
            <Text style={styles.requiredSymbol}> *</Text>
        )}
        </Text>
  )

  return (
        <TextInput
            mode={'outlined'}
            keyboardType={keyboardType}
            label={labelElement}
            style={[style, height, styles.textInput]}
            value={text}
            placeholder={placeholder}
            onChangeText={(newText) => {
              changeText(newText);
            }}
            onBlur={() => {
              if (isTrimOnBlur) {
                onChangeText(text.trim());
              }
            }}
            disabled={disabled}
            error={error}
            secureTextEntry={isSecureText}
            multiline={multiline}
            right={
            secureText && (
              <TextInput.Icon name={isSecureText ? 'eye': 'eye-off'}
                              onPress={() => {setSecureText(!isSecureText)}}
                              style={styles.icon}
              />
                )}
        />
  );
};

export default InputField;
