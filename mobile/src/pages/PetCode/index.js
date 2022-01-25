import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Share, Text, View } from 'react-native';
import { QRCode } from 'react-native-custom-qr-codes-expo';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, ButtonNav, ButtonRounded } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from "../../hooks/useAuth";
import { SITE_URL } from '../../utils/constants';
import { isStringEmpty } from '../../utils/string';
import { styles } from './styles';

export function PetCode() {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const { navigate } = useNavigation();
  const [pet, setPet] = useState();
  const [petID, setPetID] = useState("");
  const { selectedPet, user } = useAuth();
  const [navigationSelected, setNavigationSelected] = useState("veterinario");

  async function handleShare() {
    try {
      const messageVet = `Ajude a manter os registros do meu pet atualizados.\n\n Acesse o link ${SITE_URL}veterinario?id=${pet.uid} \n\n Complete o cadastro e adicione as informações dessa consulta`
      const messageTutor = `Ajude a manter os registros do meu pet atualizados.\n\n Esse é o codigo do meu pet ${pet.uid}`
      await Share.share({
        message: navigationSelected === 'veterinario' ? messageVet : messageTutor,
      });

    } catch (error) {
      alert(error.message);
    }
  }

  const handleBarCodeScanned = ({ type, data }) => {
    if(user.pets.includes(data)){
      Alert.alert(
        "Opa!",
        "O pet que está tentando adicionar ja está em sua lista"
      );
    }else{
      Alert.alert(
        "Teste",
        "Esta função esta em teste e embreve estará disponível"
      );
    }
    setScanned(false);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    setPet(selectedPet);
  }, []);

  if (!pet) return null;

  if (hasPermission === null) {
    return <Text>Solicitando permissões de acesso à camera</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso a camera</Text>;
  }

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
          <ButtonNav text="Ler Código" selected={navigationSelected === 'ler'} onPress={() => setNavigationSelected('ler')} />
        </View>
        {navigationSelected === 'veterinario' && (
          <TouchableOpacity onPress={handleShare} style={styles.petItem}>
            <QRCode content={`${SITE_URL}veterinario?id=${pet.uid}`} />
          </TouchableOpacity>
        )}
        {navigationSelected === 'tutor' && (
          <TouchableOpacity onPress={handleShare} style={styles.petItem}>
            <QRCode content={`${pet.uid}`} />
          </TouchableOpacity>
        )}
        {navigationSelected === 'ler' && (
          <View style={styles.content}>
            <Input disabled placeholder="Leia o código para adicionar" label="Código do pet" value={petID} />
            {
              !isStringEmpty(petID) && (
                <Button text="Adicionar pet" onPress={() => setScanned(true)} />
              )
            }
            <Button text="Ler QR Code" transparent onPress={() => setScanned(true)} />


            {
              scanned && (
                <Camera
                  onBarCodeScanned={handleBarCodeScanned}
                  barCodeScannerSettings={{
                    barCodeTypes: ['qr'],
                  }}
                  style={styles.barcodeContainer}
                />
              )
            }
          </View>
        )}
      </View>
    </View>
  );
}