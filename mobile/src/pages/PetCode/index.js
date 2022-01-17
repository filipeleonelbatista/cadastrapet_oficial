import { FontAwesome5 } from '@expo/vector-icons';
import React, {useState, useEffect} from 'react';
import { Image, Text, View, Share } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { QRCode } from 'react-native-custom-qr-codes-expo';
import { styles } from './styles';
import { Input } from '../../components/Input';
import { ButtonRounded } from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from "../../hooks/useAuth";
import { SITE_URL } from '../../utils/constants';

export function PetCode(){
  const { navigate } = useNavigation();
  const [pet, setPet] = useState();
  const { selectedPet } = useAuth();

  async function handleShare(){
    try {
      await Share.share({
        message: `Ajude a manter os registros do meu pet atualizados.\n\n Acesse o link ${SITE_URL}veterinario?id=${pet.uid} \n\n Complete o cadastro e adicione as informações dessa consulta`,
        });
    } catch (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    setPet(selectedPet);
  }, []);

  if (!pet) return null;

  return (    
    <View style={styles.container}>  
      <ButtonRounded onPress={ () => navigate('PetProfile') } transparent>
        <FontAwesome5 name="arrow-left" size={24} color="#566DEA"/> 
      </ButtonRounded>     
      <View style={styles.content}>
        <Image source={{uri: pet.avatar}} style={styles.petImage} />
        <Text style={styles.title}>{pet.name}</Text>  
        <Text style={styles.subtitle}>Clique no Código QR para compartilhar o link</Text>  
        <TouchableOpacity onPress={handleShare} style={styles.petItem}>
          <QRCode content={`${SITE_URL}veterinario?id=${pet.uid}`} logo={require('../../assets/qr.png')}/>
        </TouchableOpacity>
        <View style={styles.content}>
          <Input label="Código do pet" value={pet.uid} disabled/>
        </View>   
      </View>   
    </View>
  );
}