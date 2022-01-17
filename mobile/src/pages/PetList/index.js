import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Alert, BackHandler, Image, ScrollView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PetItem } from "../../components/PetItem";
import { useAuth } from "../../hooks/useAuth";
import { styles } from "./styles";

export function PetList() {
  const { navigate } = useNavigation();
  const { user, updateContextData, logout } = useAuth();

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Está de saida?", "Tem certeza que deseja sair da aplicação?", [
        {
          text: "Não",
          onPress: () => null,
          style: "cancel"
        },
        {
          text: "Sim", onPress: () => {
            logout()
            navigate('Login')
            BackHandler.exitApp()
          }
        }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);


  useEffect(() => {
    updateContextData()
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.image} />
      <Text style={styles.title}>Meus Pets</Text>
      <ScrollView style={styles.scrollView}>
        {user?.pets.length === 0 && (
          <Text style={styles.title}>Nenhum Pet cadastrado</Text>
        )}
        {user?.pets.map((pet) => (
          <PetItem key={pet} id={pet} />
        ))}
        <TouchableOpacity
          onPress={() => navigate("CreatePet")}
          style={styles.addPetButton}
        >
          <FontAwesome5
            name="plus"
            size={16}
            color="#566DEA"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.addPetButtonText}>Adicionar pet</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
