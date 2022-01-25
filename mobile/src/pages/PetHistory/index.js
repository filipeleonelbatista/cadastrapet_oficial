import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Alert, Image, ImageBackground, KeyboardAvoidingView, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Button, ButtonNav, ButtonRounded } from "../../components/Button";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { uploadImageAsync } from "../../firebase/functions";
import { useAuth } from '../../hooks/useAuth';
import { isStringEmpty, stringToDate } from "../../utils/string";
import { styles } from "./styles";

export function PetHistory() {
  const { navigate } = useNavigation();
  const { selectedPet, getNewMedicalHistoryID, updateMedicalHistoryByID } = useAuth()

  const [eventName, setEventName] = useState("");
  const [event_date, setEventDate] = useState("");
  const [anotation, setAnotation] = useState("");
  const [navigationSelected, setNavigationSelected] = useState("anotacoes");
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
    if (isStringEmpty(eventName)) {
      Alert.alert("Campo vazio", "O campo titulo da consulta não foi preenchido");
      return true;
    }
    if (!selectedImage) {
      Alert.alert("Imagem não selecionada", "Imagem não selecionada");
      return true;
    }
    if (isStringEmpty(event_date)) {
      if (event_date.length < 10) {
        Alert.alert(
          "Erro na data",
          "O campo Data da consulta não está completo"
        );
        return true;
      }
      Alert.alert(
        "Campo vazio",
        "O campo Data da consulta não foi preenchido"
      );
      return true;
    }
  }

  async function handleCreateMedicalHistory() {
    if (ValidateFields()) return;

    let uploadURLImage = '';
    if (!selectedImage.cancelled) {
      uploadURLImage = await uploadImageAsync(selectedImage.uri, '/medical-history')
    } else {
      uploadURLImage = '';
    }

    const medicalHistoryID = await getNewMedicalHistoryID()

    const data = {
      uid: medicalHistoryID,
      pet_uid: selectedPet.uid,
      attachment: uploadURLImage,
      title: eventName,
      notes: anotation,
      event_date: stringToDate(event_date).getTime(),
      created_at: Date.now(),
      updated_at: Date.now()
    };

    if (await updateMedicalHistoryByID(medicalHistoryID, data, selectedPet)) return navigate("PetMedicalHistory")

  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ButtonRounded
        onPress={() => navigate("PetMedicalHistory")}
        transparent
      >
        <FontAwesome5 name="arrow-left" size={24} color="#566DEA" />
      </ButtonRounded>

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Image
            source={{ uri: selectedPet.avatar }}
            style={styles.petImage}
          />
          <Text style={styles.title}>{selectedPet.name}</Text>
        </View>
        <View style={styles.inputGroup}>
          <Input
            placeholder="Consulta"
            value={eventName}
            onChangeText={(text) => setEventName(text)}
          />
          <Input
            maxLength={10}
            dateInputType
            placeholder="DD/MM/AAAA"
            keyboardType="decimal-pad"
            value={event_date}
            onChangeText={(text) => setEventDate(text)}
          />
        </View>
        <View style={styles.buttonNavGroup}>
          <ButtonNav text="Anotações" selected={navigationSelected === 'anotacoes'} onPress={() => setNavigationSelected('anotacoes')} />
          <ButtonNav text="Documentos" selected={navigationSelected === 'documentos'} onPress={() => setNavigationSelected('documentos')} />
        </View>
        {navigationSelected === 'anotacoes' && (
          <Textarea
            multiline={true}
            numberOfLines={5}
            placeholder="Digite aqui sua anotação aqui..."
            value={anotation}
            onChangeText={(text) => setAnotation(text)}
          />
        )}
        {navigationSelected === 'documentos' && (
          <View
            style={{ width: '100%', height: 'auto', alignItems: 'center', justifyContent: 'center' }}
          >
            {!selectedImage && <Text style={styles.title}>Selecine uma imagem</Text>}
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
          </View>
        )}
      </ScrollView>
      <View style={styles.buttonGroup}>
        <Button onPress={handleCreateMedicalHistory} text="Salvar" />
      </View>
    </KeyboardAvoidingView>
  );
}
