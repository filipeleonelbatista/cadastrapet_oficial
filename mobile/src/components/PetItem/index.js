import { FontAwesome5 } from '@expo/vector-icons';
import React, {useState, useEffect} from "react";
import { useNavigation } from '@react-navigation/native';
import { Image, Text, View } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "./styles";
import {useAuth} from '../../hooks/useAuth'

export function PetItem({id}) {
  const { navigate } = useNavigation();
  const [CurrentPet, setCurrentPet] = useState()
  const { getPetByID, setSelectedPet } = useAuth()

  const handleSelectPet = () => {
    setSelectedPet(CurrentPet)
    navigate("PetProfile")
  }

  useEffect(() => {
    const handleGetPet = async () => {
      const pet = await getPetByID(id)      
      setCurrentPet(pet)
    }
    handleGetPet()
  }, [])

  if(!CurrentPet) return null

  return (
    <TouchableOpacity style={styles.petItem} 
    onPress={handleSelectPet} >
      <Image
        source={{uri: CurrentPet.avatar}}
        style={styles.petImage}
      />
      <Text style={styles.petName}>{CurrentPet.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.petItem}>
      <Image
        source={{uri: CurrentPet.avatar}}
        style={styles.petImage}
      />
      <Text style={styles.petName}>{CurrentPet.name}</Text>
      <View style={styles.petActions}>
        <TouchableOpacity
          onPress={handleSelectPet}
          style={styles.buttonRoundedWhite}
        >
          <FontAwesome5 name="eye" size={16} color="#566DEA" />
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => Alert.alert("Voce deseja excluir?")}
          style={styles.buttonRoundedRed}
        >
          <FontAwesome5 name="trash" size={16} color="#FFF" />
        </TouchableOpacity> */}
      </View>
    </View>
  );
}
