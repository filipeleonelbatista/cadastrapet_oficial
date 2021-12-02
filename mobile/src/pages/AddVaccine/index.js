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

export function AddVaccine(){
  const { navigate } = useNavigation();
  return (    
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >  
    <TouchableOpacity onPress={ () => navigate('PetVaccineHistory') } style={styles.buttonRounded}>
      <FontAwesome5 name="arrow-left" size={24} color="#566DEA"/> 
    </TouchableOpacity>     
    <View style={styles.content}>
      <Text style={styles.title}>Adicionar Vacina</Text>  
    </View>
      <ScrollView style={styles.scrollView}>
      <View style={styles.content}>    
        <TouchableOpacity style={styles.buttonRoundedWhite}>
          <FontAwesome5 name="camera" size={48} color="#566DEA"/> 
        </TouchableOpacity>
        <View style={styles.content}>
          <Input label="Tipo vacina" />
          <Input label="Data" />
          <Input label="Proxima dose" placeholder="DD/MM/AAAA" />
        </View>
        <View style={styles.actions}>
          <Button onPress={ () => navigate('PetVaccineHistory') } text="Salvar" />
          <Button onPress={ () => navigate('PetVaccineHistory') } text="Cancelar" transparent />
        </View>
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}