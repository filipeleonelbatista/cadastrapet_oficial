import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import {
  Text, View, Image, KeyboardAvoidingView
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Button, ButtonNav } from '../../components/Button'
import { Input } from '../../components/Input'
import { Textarea } from '../../components/Textarea'
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

export function PetHistory(){
  const { navigate } = useNavigation();
  return (    
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >  
      <TouchableOpacity onPress={ () => navigate('PetProfile') }  style={styles.buttonRounded}>
        <FontAwesome5 name="arrow-left" size={24} color="#566DEA"/> 
      </TouchableOpacity>     
      <View style={styles.content}>
        <Image source={require('../../assets/doginho.png')} style={styles.petImage} />
        <Text style={styles.title}>Doguinho</Text>  
      </View>    
      <View style={styles.inputGroup}>
        <Input placeholder="Consulta" />
        <Input placeholder="DD/MM/AAAA" />
      </View>       
      <View style={styles.buttonNavGroup}>        
        <ButtonNav text="Anotações" selected/>
        <ButtonNav text="Documentos" />
        <ButtonNav text="Histórico" />
      </View>
      <ScrollView style={styles.scrollView}>  
        <Textarea 
          multiline={true} 
          numberOfLines={5}
          placeholder="Digite aqui sua anotação aqui..." 
        />
      </ScrollView>  
      <View style={styles.buttonGroup}>
        <Button onPress={ () => navigate('PetProfile') } text="Salvar" />
      </View>
    </KeyboardAvoidingView>
  );
}