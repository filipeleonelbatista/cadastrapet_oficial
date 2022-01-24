import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { ButtonRounded } from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';
import { styles } from './styles';


export function PetMedicalHistory() {
  const { navigate } = useNavigation();
  const { selectedPet, medicalHistoryList, setSelectedMedicalHistory } = useAuth()
  
  const handleSelectMedicalHistory = (selectedMedicalHistory) => {
    setSelectedMedicalHistory(selectedMedicalHistory)
    navigate("PetHistoryView")
  }

  return (
    <View style={styles.container}>
      <ButtonRounded onPress={() => navigate('PetProfile')} transparent>
        <FontAwesome5 name="arrow-left" size={24} color="#566DEA" />
      </ButtonRounded>
      <View style={styles.content}>
        <Image source={{ uri: selectedPet.avatar }} style={styles.petImage} />
        <Text style={styles.title}>{selectedPet.name}</Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Histórico médico</Text>
      </View>
      <ScrollView style={styles.scrollView}>

        {
          (medicalHistoryList.length > 0) && (
            medicalHistoryList.map(medicalHistory => (
              <TouchableOpacity onPress={() => handleSelectMedicalHistory(medicalHistory)} style={styles.petItem}>
                <View style={styles.itemRow}>
                  <Text style={styles.medicalRecordTitle}>{medicalHistory.title.substr(0, 15) + '...'}</Text>
                  <View style={styles.line}></View>
                  <Text style={styles.medicalRecordDate}>{medicalHistory.event_date}</Text>
                </View>
                <Text style={styles.repeatApplicationDate}>{medicalHistory.notes.substr(0, 25) + '...'}</Text>
              </TouchableOpacity>
            ))
          )
        }


        <TouchableOpacity onPress={() => navigate('PetHistory')} style={styles.addPetButton}>
          <FontAwesome5 name="plus" size={16} color="#566DEA" style={{ marginRight: 8 }} />
          <Text style={styles.addPetButtonText}>Adicionar histórico</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}