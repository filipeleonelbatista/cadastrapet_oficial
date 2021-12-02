import React from 'react';

import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { styles } from './styles';

import {FontAwesome5} from '@expo/vector-icons'
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useNavigation } from '@react-navigation/native';

export function CreatePet(){
  const { navigate } = useNavigation();
  return (    
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >  
    <TouchableOpacity onPress={ () => navigate('PetProfile') } style={styles.buttonRounded}>
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
          <Button onPress={ () => navigate('PetProfile') } text="Salvar" />
          <Button onPress={ () => navigate('PetProfile') } text="Cancelar" transparent />
        </View>
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}