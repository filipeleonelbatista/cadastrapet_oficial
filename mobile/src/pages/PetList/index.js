import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, BackHandler, FlatList, Image, ScrollView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Loading } from "../../components/Loading";
import { PetItem } from "../../components/PetItem";
import { useAuth } from "../../hooks/useAuth";
import { styles } from "./styles";
import Toast from 'react-native-root-toast';

export function PetList(props) {
  const { navigate } = useNavigation();
  const { logout, isLoaded, petList, updateContextData } = useAuth();
  const [refreshing, setRefreshing] = useState(false)

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

  const handleRefresh = async () => {
    setRefreshing(true)
    
    const handleUpdateData = async () => await updateContextData()
    handleUpdateData();

    Toast.show('Dados atualizados', {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    })

    setRefreshing(false)
  }

  return (
    <>
      {isLoaded ? <Loading /> : (
        <View style={styles.container}>
          <Image source={require("../../assets/logo.png")} style={styles.image} />
          <Text style={styles.title}>Meus Pets</Text>
          {petList.length === 0 && (
            <View
              style={styles.scrollView}
            >
              <Text style={styles.title}>Nenhum Pet cadastrado</Text>
            </View>
          )}
          <FlatList
            data={petList}
            keyExtractor={pet => String(pet.uid)}
            style={styles.scrollView}
            onRefresh={handleRefresh}
            refreshing={refreshing}
            renderItem={({ item }) => <PetItem key={item.uid} pet={item} />}
          />
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
        </View>
      )}
    </>
  );
}
