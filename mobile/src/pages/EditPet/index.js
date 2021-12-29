import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { ImageBackground, KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { uploadImageAsync } from '../../firebase/functions';
import { useAuth } from "../../hooks/useAuth";
import { usePet } from "../../hooks/usePet";
import { isStringEmpty } from "../../utils/string";
import { styles } from "./styles";

export function EditPet() {
  const { navigate } = useNavigation();
  const {user} = useAuth()
  const {selectedPet, updatePetByID} = usePet()

  const [name, setName] = useState("");
  const [birth_date, setBirthDate] = useState("");
  const [adoption_date, setAdoptionDate] = useState("");
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
      Alert.alert("Campo vazio", "O campo nome não foi preenchido");
      return true;
    }
    if (!selectedImage) {
      Alert.alert("Imagem não selecionada", "Imagem não selecionada");
      return true;
    }
    if (isStringEmpty(birth_date)) {
      Alert.alert(
        "Campo vazio",
        "O campo data de nascimento não foi preenchido"
      );
      return true;
    }
  }

  async function handleEditPet(){
    if(ValidateFields()) return;   
    let uploadURLImage = '';
    if(!selectedImage.cancelled){
      uploadURLImage = await uploadImageAsync(selectedImage.uri, '/pets')
    }

    const data = {
      uid: selectedPet.uid,
      name,
      avatar: uploadURLImage,
      tutor: [user.uid],
      adoption_date,
      birth_date,
      events: []
    };

    if(await updatePetByID(selectedPet.uid, data, user)) return navigate("PetProfile")

  }

  useEffect(() => {
    setAdoptionDate(selectedPet.adoption_date)
    setSelectedImage({uri: selectedPet.avatar})
    setBirthDate(selectedPet.birth_date)
    setName(selectedPet.name)
  },[])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableOpacity
        onPress={() => navigate("PetList")}
        style={styles.buttonRounded}
      >
        <FontAwesome5 name="arrow-left" size={24} color="#566DEA" />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.title}>Editar Pet</Text>
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
            <Input 
              label="Nome"
              value={name}
              onChangeText={(text) => setName(text)}
               />
            <Input
              maxLength={10}
              dateInputType
              label="Data de nascimento"
              placeholder="DD/MM/AAAA"
              keyboardType="decimal-pad"
              value={birth_date}
              onChangeText={(text) => setBirthDate(text)}
            />
            <Input
              maxLength={10}
              dateInputType
              label="Data Adoção"
              placeholder="DD/MM/AAAA"
              keyboardType="decimal-pad"
              value={adoption_date}
              onChangeText={(text) => setAdoptionDate(text)}
            />
          </View>
          <View style={styles.actions}>
            <Button onPress={handleEditPet} text="Salvar" />
            <Button
              onPress={() => navigate("PetProfile")}
              text="Cancelar"
              transparent
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
