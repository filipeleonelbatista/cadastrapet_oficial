import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from "expo-image-picker";
import React, { useState } from 'react';
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform, Text, View
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Button, ButtonRounded } from '../../components/Button';
import { Input } from '../../components/Input';
import { uploadImageAsync } from '../../firebase/functions';
import { useAuth } from '../../hooks/useAuth';
import { isStringEmpty, stringToDate } from '../../utils/string';
import { styles } from './styles';

export function AddVaccine() {
  const { navigate } = useNavigation();
  const { selectedPet, getNewVaccineID, updateVaccineByID } = useAuth()

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      base64: true,

    });

    if (!result.cancelled) {
      setSelectedImage(result);
    }
  };

  const ValidateFields = () => {
    if (isStringEmpty(name)) {
      Alert.alert("Campo vazio", "O campo nome da vacina não foi preenchido");
      return true;
    }
    if (!selectedImage) {
      Alert.alert("Imagem não selecionada", "Imagem não selecionada");
      return true;
    }
    if (isStringEmpty(date)) {
      if (date.length < 10) {
        Alert.alert(
          "Erro na data",
          "O campo data de aplicação não está completo"
        );
        return true;
      }
      Alert.alert(
        "Campo vazio",
        "O campo data de aplicação não foi preenchido"
      );
      return true;
    }
  }

  async function handleAddVaccine() {
    if (ValidateFields()) return;

    let uploadURLImage = '';
    if (!selectedImage.cancelled) {
      uploadURLImage = await uploadImageAsync(selectedImage.uri, '/vaccine')
    }

    const vaccineID = await getNewVaccineID()

    const data = {
      uid: vaccineID,
      vaccine: name,
      vaccine_receipt: uploadURLImage,
      vaccine_application_date: stringToDate(date).getTime(),
      created_at: Date.now(),
      updated_at: Date.now()
    };

    if (await updateVaccineByID(vaccineID, data, selectedPet)) return navigate("PetVaccineHistory")
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ButtonRounded onPress={() => navigate('PetVaccineHistory')} transparent >
        <FontAwesome5 name="arrow-left" size={24} color="#566DEA" />
      </ButtonRounded>
      <View style={styles.content}>
        <Text style={styles.title}>Adicionar Vacina</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <TouchableOpacity
            onPress={pickImage}
            style={styles.buttonRoundedWhite}
          >
            {!selectedImage ? (
              <FontAwesome5 name="camera" size={48} color="#566DEA" />
            ) : (
              <ImageBackground
                source={{
                  uri: selectedImage.uri,
                }}
                style={{ width: 96, height: 96 }}
                imageStyle={{ borderRadius: 96 }}
              />
            )}
          </TouchableOpacity>
          <View style={styles.content}>
            <Input label="Tipo vacina" value={name} onChangeText={text => setName(text)} />
            <Input label="Data" keyboardType="decimal-pad" dateInputType placeholder="DD/MM/AAAA" value={date} onChangeText={text => setDate(text)} />
          </View>
          <View style={styles.actions}>
            <Button onPress={handleAddVaccine} text="Salvar" />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}