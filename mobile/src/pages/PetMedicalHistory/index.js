import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { ButtonRounded } from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';
import { dateToString, yearNow } from '../../utils/string';
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
        <View style={styles.petData}>
          <Text style={styles.title}>{selectedPet.name}</Text>
          <Text style={styles.petAge}>{yearNow(selectedPet.birth_date) == 1 ? yearNow(selectedPet.birth_date) + ' Ano' : yearNow(selectedPet.birth_date) + ' Anos'}</Text>
        </View>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Histórico médico</Text>
      </View>
      <ScrollView style={styles.scrollView}>

        {
          (medicalHistoryList.length > 0) && (
            medicalHistoryList.map(medicalHistory => (
              <TouchableOpacity key={medicalHistory.uid} onPress={() => handleSelectMedicalHistory(medicalHistory)} style={styles.petItem}>
                <View style={styles.itemRow}>
                  <Text style={styles.medicalRecordTitle}>{medicalHistory.title.length > 10 ? medicalHistory.title.substr(0, 10) + '...' : medicalHistory.title}</Text>
                  <View style={styles.line}></View>
                  <Text style={styles.medicalRecordDate}>{dateToString(medicalHistory.event_date)}</Text>
                </View>
                <Text style={styles.repeatApplicationDate}>{medicalHistory.notes.length > 25 ? medicalHistory.notes.substr(0, 25) + '...' : medicalHistory.notes}</Text>
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