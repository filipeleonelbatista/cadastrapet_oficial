import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from './styles';
import {useAuth} from '../../hooks/useAuth'


export function PetMedicalHistory(){
  const { navigate } = useNavigation();
  const { selectedPet } =  useAuth()
  return (    
    <View style={styles.container}>  
    <TouchableOpacity onPress={ () => navigate('PetProfile') } style={styles.buttonRounded}>
      <FontAwesome5 name="arrow-left" size={24} color="#566DEA"/> 
    </TouchableOpacity>     
    <View style={styles.content}>
      <Image source={{uri: selectedPet.avatar}} style={styles.petImage} />
      <Text style={styles.title}>{selectedPet.name}</Text>  
    </View>
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Histórico médico</Text>  
    </View>
      <ScrollView style={styles.scrollView}>
        <TouchableOpacity style={styles.petItem}>
          <View style={styles.itemRow}>            
            <Text style={styles.medicalRecordTitle}>Consulta</Text>
            <View style={styles.line}></View>
            <Text style={styles.medicalRecordDate}>23/12/2021</Text>
          </View>
          <Text style={styles.repeatApplicationDate}>Resuminho</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={ () => navigate('PetHistory') } style={styles.addPetButton}>
          <FontAwesome5 name="plus" size={16} color="#566DEA" style={{marginRight: 8}}/> 
          <Text style={styles.addPetButtonText}>Adicionar histórico</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}