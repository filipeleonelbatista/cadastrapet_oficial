import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { ButtonRounded } from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';
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
        <Text style={styles.title}>{selectedPet.name}</Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Vacinas</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {
          (vaccineList.length > 0) && (
            vaccineList.map(vaccine => (
              <TouchableOpacity onPress={() => handleSelectVaccine(vaccine)} style={styles.petItem}>
                <View style={styles.itemRow}>
                  <Text style={styles.vaccine}>{vaccine.vaccine}</Text>
                  <View style={styles.line}></View>
                  <Text style={styles.applicationDate}>{vaccine.vaccine_application_date}</Text>
                </View>
                {/* <Text style={styles.repeatApplicationDate}>Próx. dose: 11/01/2022</Text> */}
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