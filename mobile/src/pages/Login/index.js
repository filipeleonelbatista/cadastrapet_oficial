import React from 'react';

import {
  View,
  Text,
  Image
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { styles } from './styles';
import { Button } from '../../components/Button';

export function Login(){
  const { navigate } = useNavigation();
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.image} />
      <Text style={styles.subtitle}>Cadastrando e Prolongando Vidas</Text>
      <View style={styles.buttonGroup}>
        <Button text="Login" onPress={ () => navigate('PetList') } />
        <Button transparent text="Criar" />
      </View>
    </View>
  );
}