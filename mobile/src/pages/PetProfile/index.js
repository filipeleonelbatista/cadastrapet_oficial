import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import { Image, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { ButtonRounded } from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';
import { styles } from './styles';

export function PetProfile(){
  const { navigate } = useNavigation();
  const [pet, setPet] = useState();
  
  const { selectedPet } = useAuth()

  useEffect(() => {    
    setPet(selectedPet)
  }, [])

  if(!pet) return null

  return (    
    <View style={styles.container}>  
    <ButtonRounded onPress={() => navigate('PetList')} transparent>
      <FontAwesome5 name="arrow-left" size={24} color="#566DEA"/> 
    </ButtonRounded>     
    <View style={styles.content}>
      <Image source={{uri: pet.avatar}} style={styles.petImage} />
      <Text style={styles.title}>{pet.name}</Text>  
    </View>
      <ScrollView style={styles.scrollView}>
        <TouchableOpacity onPress={() => navigate('PetGeneralData')} style={styles.petItem}>
          <FontAwesome5 style={{marginRight: 8}} name="book-open" size={44} color="#566DEA"/> 
          <Text style={styles.petName}>Dados Gerais</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('PetMedicalHistory')} style={styles.petItem}>
          <FontAwesome5 style={{marginRight: 8}} name="book-medical" size={44} color="#566DEA"/> 
          <Text style={styles.petName}>Histórico de Consultas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('PetVaccineHistory')} style={styles.petItem}>
          <FontAwesome5 style={{marginRight: 8}} name="th" size={44} color="#566DEA"/> 
          <Text style={styles.petName}>Carteira de vacinação</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('PetCode')} style={styles.petItem}>
          <Image source={require('../../assets/qr.png')} />
          <Image source={require('../../assets/codigoPet.png')} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}