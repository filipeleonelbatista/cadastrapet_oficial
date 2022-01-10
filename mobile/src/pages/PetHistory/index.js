import { FontAwesome5 } from "@expo/vector-icons";
import React, {useState} from "react";
import { Text, View, Image, KeyboardAvoidingView } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Button, ButtonNav } from "../../components/Button";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import {useAuth} from '../../hooks/useAuth'

export function PetHistory() {
  const { navigate } = useNavigation();
  const { selectedPet } =  useAuth()
  
  const [eventName, setEventName] = useState("");
  const [event_date, setEventDate] = useState("");
  const [anotation, setAnotation] = useState("");
  const [navigationSelected, setNavigationSelected] = useState("anotacoes");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableOpacity
        onPress={() => navigate("PetMedicalHistory")}
        style={styles.buttonRounded}
      >
        <FontAwesome5 name="arrow-left" size={24} color="#566DEA" />
      </TouchableOpacity>
      <View style={styles.content}>
        <Image
          source={{uri: selectedPet.avatar}}
          style={styles.petImage}
        />
        <Text style={styles.title}>{selectedPet.name}</Text>
      </View>
      <View style={styles.inputGroup}>
        <Input placeholder="Consulta" />
        <Input
          maxLength={10}
          dateInputType
          placeholder="DD/MM/AAAA"
          keyboardType="decimal-pad"
        />
      </View>
      <View style={styles.buttonNavGroup}>
        <ButtonNav text="Anotações" selected={navigationSelected === 'anotacoes'} onPress={() => setNavigationSelected('anotacoes')} />
        <ButtonNav text="Documentos" selected={navigationSelected === 'documentos'} onPress={() => setNavigationSelected('documentos')}/>
      </View>
      <ScrollView style={styles.scrollView}>
      {navigationSelected === 'anotacoes' && (
        <Textarea
          multiline={true}
          numberOfLines={5}
          placeholder="Digite aqui sua anotação aqui..."
        />
      )}
      {navigationSelected === 'documentos' && (
        <>
        <Text>Nenhum Documento selecionado</Text>
        </>
      )}
        
      </ScrollView>
      <View style={styles.buttonGroup}>
        <Button onPress={() => navigate("PetProfile")} text="Salvar" />
      </View>
    </KeyboardAvoidingView>
  );
}
