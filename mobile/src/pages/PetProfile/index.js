import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, RefreshControl, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { ButtonRounded } from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';
import { yearNow } from '../../utils/string';
import { styles } from './styles';
import Toast from 'react-native-root-toast';

export function PetProfile() {
  const [refreshing, setRefreshing] = useState(false)
  const { navigate } = useNavigation();
  const [pet, setPet] = useState();

  const { selectedPet, getPetByID, setSelectedPet } = useAuth()

  const handleRefresh = async () => {
    setRefreshing(true)

    const handleUpdateData = async () => {
      const updatedPet = await getPetByID(selectedPet.uid)
      setSelectedPet(updatedPet)
      setPet(updatedPet)
    }
    handleUpdateData();

    Toast.show('Dados atualizados', {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    })
    setRefreshing(false)
  }

  useEffect(() => {
    setPet(selectedPet)
  }, [])

  if (!pet) return null

  return (
    <View style={styles.container}>
      <ButtonRounded onPress={() => navigate('PetList')} transparent>
        <FontAwesome5 name="arrow-left" size={24} color="#566DEA" />
      </ButtonRounded>
      <View style={styles.content}>
        <Image source={{ uri: pet.avatar }} style={styles.petImage} />
        <View style={styles.petData}>
          <Text style={styles.title}>{pet.name}</Text>
          <Text style={styles.petAge}>{yearNow(pet.birth_date) >= 1 ? yearNow(pet.birth_date) + ' Anos' : yearNow(pet.birth_date) + ' Ano'}</Text>
        </View>
      </View>
      <ScrollView style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }>
        <TouchableOpacity onPress={() => navigate('EditPet')} style={styles.petItem}>
          <FontAwesome5 style={{ marginRight: 8 }} name="book-open" size={44} color="#566DEA" />
          <Text style={styles.petName}>Dados Gerais</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('PetMedicalHistory')} style={styles.petItem}>
          <FontAwesome5 style={{ marginRight: 8 }} name="book-medical" size={44} color="#566DEA" />
          <Text style={styles.petName}>Histórico de Consultas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('PetVaccineHistory')} style={styles.petItem}>
          <FontAwesome5 style={{ marginRight: 8 }} name="th" size={44} color="#566DEA" />
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