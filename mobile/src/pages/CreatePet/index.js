import React from 'react';

import {
  View,
  Text,
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { styles } from './styles';

import {FontAwesome5} from '@expo/vector-icons'
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

export function CreatePet(){
  return (
    <View style={styles.container}>   
    <TouchableOpacity style={styles.buttonRounded}>
      <FontAwesome5 name="arrow-left" size={24} color="#566DEA"/> 
    </TouchableOpacity>     
    <View style={styles.content}>
      <Text style={styles.title}>Adicionar Pet</Text>  
    </View>
      <ScrollView style={styles.scrollView}>
      <View style={styles.content}>    
        <TouchableOpacity style={styles.buttonRoundedWhite}>
          <FontAwesome5 name="camera" size={48} color="#566DEA"/> 
        </TouchableOpacity>
        <View style={styles.content}>
          <Input label="Nome" />
          <Input label="Tipo de animal" />
          <Input label="Data Nascimento" placeholder="DD/MM/AAAA" />
          <Input label="Tipo Sanguíneo" />
        </View>
        <View style={styles.actions}>
          <Button text="Salvar" />
          <Button text="Cancelar" transparent />
        </View>
      </View>
      </ScrollView>
    </View>
  );
}