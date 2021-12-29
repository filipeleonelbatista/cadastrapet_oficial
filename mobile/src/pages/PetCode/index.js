import { FontAwesome5 } from '@expo/vector-icons';
import React, {useState, useEffect} from 'react';
import { Image, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { QRCode } from 'react-native-custom-qr-codes-expo';
import { styles } from './styles';
import { Input } from '../../components/Input';
import { useNavigation } from '@react-navigation/native';
import { usePet } from "../../hooks/usePet";
import { SITE_URL } from '../../utils/constants';

export function PetCode(){
  const { navigate } = useNavigation();
  const [pet, setPet] = useState();
  const { selectedPet } = usePet();

  useEffect(() => {
    setPet(selectedPet);
  }, []);

  if (!pet) return null;

  return (    
    <View style={styles.container}>  
      <TouchableOpacity onPress={ () => navigate('PetProfile') }  style={styles.buttonRounded}>
        <FontAwesome5 name="arrow-left" size={24} color="#566DEA"/> 
      </TouchableOpacity>     
      <View style={styles.content}>
        <Image source={{uri: pet.avatar}} style={styles.petImage} />
        <Text style={styles.title}>{pet.name}</Text>  
        <View style={styles.petItem}>
          <QRCode content={`${SITE_URL}veterinario?id=${pet.uid}`} logo={require('../../assets/qr.png')}/>
        </View>
        <View style={styles.content}>
          <Input label="Código do pet" value={pet.uid} disabled/>
        </View>   
      </View>   
    </View>
  );
}