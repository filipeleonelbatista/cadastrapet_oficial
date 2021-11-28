import React from 'react';

import {
  View,
  Text,
  Image
} from 'react-native';

import { RectButton } from 'react-native-gesture-handler';

import { styles } from './styles';

import {Logo} from '../../assets/logo.png'

export function Login(){
  return (
    <View style={styles.container}>
      <Image source={Logo} />
      <Text>Prolongue a vida do seu Pet</Text>
      <View>
        <RectButton>
          <Text>Login</Text>
        </RectButton>
        <RectButton>
          <Text>Criar conta</Text>
        </RectButton>
      </View>
    </View>
  );
}