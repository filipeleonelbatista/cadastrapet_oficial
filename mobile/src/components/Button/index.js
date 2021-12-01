import React from 'react';
import { Text } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

import { styles } from './styles';

export function Button({children, text, transparent=false, onPress, ...rest}){
  return (
    <TouchableOpacity style={transparent ? styles.buttonTransparent : styles.button } 
    {...rest}>
      <Text style={transparent ? styles.textButtonTransparent : styles.textButton} >{text}</Text>
    </TouchableOpacity>
  );
}