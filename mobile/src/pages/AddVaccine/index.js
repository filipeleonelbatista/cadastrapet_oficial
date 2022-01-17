import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform, Text, View
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Button, ButtonRounded } from '../../components/Button';
import { Input } from '../../components/Input';
import { styles } from './styles';

export function AddVaccine(){
  const { navigate } = useNavigation();
  return (    
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >  
    <ButtonRounded onPress={ () => navigate('PetVaccineHistory') } transparent >
      <FontAwesome5 name="arrow-left" size={24} color="#566DEA"/> 
    </ButtonRounded>     
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