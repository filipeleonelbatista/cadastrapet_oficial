import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import { Image, Text, View } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAuth } from '../../hooks/useAuth';
import { yearNow } from '../../utils/string';
import { styles } from "./styles";

export function PetItem({ pet }) {
  const { navigate } = useNavigation();
  const [CurrentPet, setCurrentPet] = useState()
  const { setSelectedPet } = useAuth()

  const handleSelectPet = () => {
    setSelectedPet(CurrentPet)
    navigate("PetProfile")
  }

  useEffect(() => {
    setCurrentPet(pet)
  }, [])

  if (!CurrentPet) return null

  return (
    <TouchableOpacity style={styles.petItem}
      onPress={handleSelectPet} >
      <Image
        source={{ uri: CurrentPet.avatar }}
        style={styles.petImage}
      />
      <View style={styles.petData}>
        <Text style={styles.petName}>{CurrentPet.name}</Text>
        <Text style={styles.petAge}>{yearNow(CurrentPet.birth_date) == 1 ? yearNow(CurrentPet.birth_date) + ' Ano' : yearNow(CurrentPet.birth_date) + ' Anos'}</Text>
      </View>
    </TouchableOpacity>
  );
}
