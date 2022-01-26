import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, Share, Text, View } from 'react-native';
import { QRCode } from 'react-native-custom-qr-codes-expo';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ButtonNav, ButtonRounded } from '../../components/Button';
import { useAuth } from "../../hooks/useAuth";
import { SITE_URL } from '../../utils/constants';
import { styles } from './styles';

export function PetCode() {

  const { navigate } = useNavigation();
  const [pet, setPet] = useState();
  const { selectedPet } = useAuth();
  const [navigationSelected, setNavigationSelected] = useState("veterinario");

  async function handleShare() {
    try {
      const messageVet = `Ajude a manter os registros do meu pet atualizados.\n\n Acesse o link ${SITE_URL}veterinario?id=${pet.uid} \n\n Complete o cadastro e adicione as informações dessa consulta`
      await Share.share({
        message: messageVet,
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
      <ButtonRounded onPress={() => navigate('PetProfile')} transparent>
        <FontAwesome5 name="arrow-left" size={24} color="#566DEA" />
      </ButtonRounded>
      <View style={styles.content}>
        <Image source={{ uri: pet.avatar }} style={styles.petImage} />
        <Text style={styles.title}>{pet.name}</Text>
        <Text style={styles.subtitle}>Clique no Código QR para compartilhar o link</Text>
        <View style={styles.buttonNavGroup}>
          <ButtonNav text="Veterinário" selected={navigationSelected === 'veterinario'} onPress={() => setNavigationSelected('veterinario')} />
          <ButtonNav text="Tutor" selected={navigationSelected === 'tutor'} onPress={() => setNavigationSelected('tutor')} />
        </View>
        {navigationSelected === 'veterinario' && (
          <TouchableOpacity onPress={handleShare} style={styles.petItem}>
            <QRCode content={`${SITE_URL}veterinario?id=${pet.uid}`} />
          </TouchableOpacity>
        )}
        {navigationSelected === 'tutor' && (
          <View style={styles.petItem}>
            <QRCode content={`${pet.uid}`} />
          </View>
        )}
      </View>
    </View>
  );
}