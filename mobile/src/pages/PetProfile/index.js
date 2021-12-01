import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import {
  Text, View, Image
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from './styles';

export function PetProfile(){
  return (    
    <View style={styles.container}>  
    <TouchableOpacity style={styles.buttonRounded}>
      <FontAwesome5 name="arrow-left" size={24} color="#566DEA"/> 
    </TouchableOpacity>     
    <View style={styles.content}>
      <Image source={require('../../assets/doginho.png')} style={styles.petImage} />
      <Text style={styles.title}>Doguinho</Text>  
    </View>
      <ScrollView style={styles.scrollView}>
        <TouchableOpacity style={styles.petItem}>
          <FontAwesome5 style={{marginRight: 8}} name="book-open" size={44} color="#566DEA"/> 
          <Text style={styles.petName}>Dados Gerais</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.petItem}>
          <FontAwesome5 style={{marginRight: 8}} name="book-medical" size={44} color="#566DEA"/> 
          <Text style={styles.petName}>Histórico de Consultas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.petItem}>
          <FontAwesome5 style={{marginRight: 8}} name="th" size={44} color="#566DEA"/> 
          <Text style={styles.petName}>Carteira de vacinação</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.petItem}>
          <Image source={require('../../assets/qr.png')} />
          <Image source={require('../../assets/codigoPet.png')} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}