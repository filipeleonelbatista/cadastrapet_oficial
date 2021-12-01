import React from 'react';

import {
  View,
  Text,
  Image
} from 'react-native';

import { styles } from './styles';
import { Button } from '../../components/Button';

export function Login(){
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.image} />
      <Text style={styles.subtitle}>Cadastrando e Prolongando Vidas</Text>
      <View style={styles.buttonGroup}>
        <Button text="Login" />
        <Button transparent text="Criar" />
      </View>
    </View>
  );
}