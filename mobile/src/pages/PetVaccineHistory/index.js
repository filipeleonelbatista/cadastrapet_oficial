import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from './styles';
import {ButtonRounded} from '../../components/Button'

export function PetVaccineHistory(){
  const { navigate } = useNavigation();
  return (    
    <View style={styles.container}>  
    <ButtonRounded onPress={ () => navigate('PetProfile') } transparent>
      <FontAwesome5 name="arrow-left" size={24} color="#566DEA"/> 
    </ButtonRounded>     
    <View style={styles.content}>
      <Image source={require('../../assets/doginho.png')} style={styles.petImage} />
      <Text style={styles.title}>Doguinho</Text>  
    </View>
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Vacinas</Text>  
    </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.petItem}>
          <View style={styles.itemRow}>            
            <Text style={styles.vaccine}>Raiva</Text>
            <View style={styles.line}></View>
            <Text style={styles.applicationDate}>23/12/2021</Text>
          </View>
          <Text style={styles.repeatApplicationDate}>Próx. dose: 11/01/2022</Text>
        </View>
        <View style={styles.petItem}>
          <View style={styles.itemRow}>            
            <Text style={styles.vaccine}>Raiva</Text>
            <View style={styles.line}></View>
            <Text style={styles.applicationDate}>23/12/2021</Text>
          </View>
          <Text style={styles.repeatApplicationDate}></Text>
        </View>
        <TouchableOpacity onPress={ () => navigate('AddVaccine') } style={styles.addPetButton}>
          <FontAwesome5 name="plus" size={16} color="#566DEA" style={{marginRight: 8}}/> 
          <Text style={styles.addPetButtonText}>Adicionar vacina</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}