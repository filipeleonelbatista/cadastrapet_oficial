import React from 'react';

import {
  View,
  Text,
  TextInput
} from 'react-native';

import { styles } from './styles';

export function Textarea({label, error, onChangeText, placeholder, disabled=false, ...rest}){
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        editable={!disabled}
        selectTextOnFocus={!disabled}
        style={disabled ? styles.inputDisabled : styles.input}
        onChangeText={text => onChangeText(text)}
        placeholder={placeholder} 
        {...rest}
        />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}