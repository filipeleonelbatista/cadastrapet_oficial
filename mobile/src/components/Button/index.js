import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from './styles';

export function Button({ children, text, transparent = false, onPress, ...rest }) {
  return (
    <TouchableOpacity onPress={onPress} style={transparent ? styles.buttonTransparent : styles.button}
      {...rest}>
      <Text style={transparent ? styles.textButtonTransparent : styles.textButton} >{text}</Text>
    </TouchableOpacity>
  );
}

export function ButtonNav({ children, text, selected = false, onPress, ...rest }) {
  return (
    <TouchableOpacity onPress={onPress} style={selected ? styles.buttonNavActive : styles.buttonNav}
      {...rest}>
      <Text style={selected ? styles.buttonNavTextActive : styles.buttonNavText}>{text}</Text>
    </TouchableOpacity>
  );
}

export function ButtonRounded({ children, transparent = false, onPress, ...rest }) {
  return (
    <View style={styles.containerButtonRounded}>
      <TouchableOpacity onPress={onPress} style={transparent ? styles.buttonRounded : styles.buttonRoundedBlue}
        {...rest}>
        {children}
      </TouchableOpacity>
    </View>
  );
}