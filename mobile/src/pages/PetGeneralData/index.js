import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ImageBackground, KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Button, ButtonRounded } from "../../components/Button";
import { Input } from "../../components/Input";
import { useAuth } from "../../hooks/useAuth";
import { styles } from "./styles";

export function PetGeneralData() {
  const { navigate } = useNavigation();
  const [pet, setPet] = useState();
  const { selectedPet } = useAuth();

  useEffect(() => {
    setPet(selectedPet);
  }, []);

  if (!pet) return null;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ButtonRounded
        onPress={() => navigate("PetProfile")}
        transparent
      >
        <FontAwesome5 name="arrow-left" size={24} color="#566DEA" />
      </ButtonRounded>
      <View style={styles.content}>
        <Text style={styles.title}>Dados Gerais</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <ImageBackground
            source={{
              uri: pet.avatar,
            }}
            style={{ width: 96, height: 96 }}
            imageStyle={{ borderRadius: 96 }}
          />
          <View style={styles.content}>
            <Input label="Nome" value={pet.name} disabled />
            <Input
              label="Data Nascimento"
              placeholder="DD/MM/AAAA"
              value={pet.birth_date} 
              disabled
            />
            <Input
              label="Data Adoção"
              placeholder="DD/MM/AAAA"
              value={pet.adoption_date}
              disabled
            />
          </View>
          <View style={styles.actions}>
            <Button onPress={() => navigate("EditPet")} text="Editar" />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
