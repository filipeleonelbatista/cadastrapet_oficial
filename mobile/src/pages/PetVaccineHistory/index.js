import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { ButtonRounded } from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';
import { dateToString, yearNow } from '../../utils/string';
import { styles } from './styles';

export function PetVaccineHistory() {
  const { navigate } = useNavigation();
  const { selectedPet, vaccineList, setSelectedVaccine } = useAuth()

  const handleSelectVaccine = (selectedVaccine) => {
    setSelectedVaccine(selectedVaccine)
    navigate("ViewVaccine")
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
        <Text style={styles.headerTitle}>Vacinas</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {
          (vaccineList.length > 0) && (
            vaccineList.map(vaccine => (
              <TouchableOpacity key={vaccine.uid} onPress={() => handleSelectVaccine(vaccine)} style={styles.petItem}>
                <View style={styles.itemRow}>
                  <Text style={styles.vaccine}>{vaccine.vaccine}</Text>
                  <View style={styles.line}></View>
                  <Text style={styles.applicationDate}>{dateToString(vaccine.vaccine_application_date)}</Text>
                </View>
              </TouchableOpacity>
            ))
          )
        }
        <TouchableOpacity onPress={() => navigate('AddVaccine')} style={styles.addPetButton}>
          <FontAwesome5 name="plus" size={16} color="#566DEA" style={{ marginRight: 8 }} />
          <Text style={styles.addPetButtonText}>Adicionar vacina</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}