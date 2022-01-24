import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Dimensions, Image, ImageBackground, KeyboardAvoidingView, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ButtonNav, ButtonRounded } from "../../components/Button";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { useAuth } from '../../hooks/useAuth';
import { styles } from "./styles";

export function PetHistoryView() {
  const { navigate } = useNavigation();
  const { selectedPet, selectedMedicalHistory } = useAuth()

  const [navigationSelected, setNavigationSelected] = useState("anotacoes");
  
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
            label="Consulta"
            value={selectedMedicalHistory.title}
            disabled
          />
          <Input
            label="Data da consulta"
            value={selectedMedicalHistory.event_date}
            disabled
          />
        </View>
        <View style={styles.buttonNavGroup}>
          <ButtonNav text="Anotações" selected={navigationSelected === 'anotacoes'} onPress={() => setNavigationSelected('anotacoes')} />
          <ButtonNav text="Documentos" selected={navigationSelected === 'documentos'} onPress={() => setNavigationSelected('documentos')} />
        </View>
        {navigationSelected === 'anotacoes' && (
          <View style={ { paddingHorizontal: 24, paddingTop: 8 }}>
            <Text>{selectedMedicalHistory.notes}</Text>
          </View>
        )}
        {navigationSelected === 'documentos' && (
          <View
            style={{ width: '100%', height: 'auto', alignItems: 'center', justifyContent: 'center', paddingVertical: 8 }}
          >
              <ImageBackground
                source={{
                  uri: selectedMedicalHistory.attachment,
                }}
                style={{ width: Dimensions.get('window').width - 24, height: Dimensions.get('window').width - 24 }}
              />
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}