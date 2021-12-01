import React from 'react';

import {
  View,
  Text,
  TextInput
} from 'react-native';

import { styles } from './styles';

export function Input({label, error, onChangeText, placeholder, ...rest}){
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        onChangeText={text => onChangeText(text)}
        placeholder={placeholder} 
        {...rest}
        />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}