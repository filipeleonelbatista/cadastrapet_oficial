import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, FlatList, Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Toast from "react-native-root-toast";
import { Loading } from "../../components/Loading";
import { PetItem } from "../../components/PetItem";
import { useAuth } from "../../hooks/useAuth";
import { styles } from "./styles";

export function PetList(props) {
  const { navigate } = useNavigation();
  const { user, logout, isLoaded, petList, updateContextData } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const handleLogout = () => {
    Alert.alert("Está de saida?", "Tem certeza que deseja sair da aplicação?", [
      {
        text: "Não",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => {
          logout();
          navigate("Login");
        },
      },
    ]);
  };

  const handleRefresh = async () => {
    setRefreshing(true);

    const handleUpdateData = async () => await updateContextData();
    handleUpdateData();

    Toast.show("Dados atualizados", {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });

    setRefreshing(false);
  };

  if (!user) return null;

  return (
    <>
      {isLoaded ? (
        <Loading />
      ) : (
        <>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: 24,
              backgroundColor: "#F3F5FF",
            }}
          >
            <TouchableOpacity
              style={{
                ...styles.petImage,
                backgroundColor: "#566dea",
              }}
              onPress={() => {}}
            >
              {user?.avataer === "" ? (
                <FontAwesome5 name="user-alt" size={22} color="#FFF" />
              ) : (
                <Image source={{ uri: user.avatar }} style={styles.petImage} />
              )}
            </TouchableOpacity>

            <Image
              source={require("../../assets/logo.png")}
              style={styles.image}
            />
            <TouchableOpacity
              style={{
                ...styles.petImage,
                backgroundColor: "transparent",
              }}
              onPress={handleLogout}
            >
              <FontAwesome5 name="sign-out-alt" size={22} color="#FF0000A0" />
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <Text style={styles.title}>Meus Pets</Text>
            {petList.length === 0 ? (
              <View
                style={{
                  ...styles.scrollView,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    ...styles.title,
                    fontWeight: "normal",
                    fontFamily: "Poppins_400Regular",
                  }}
                >
                  Você não possui pets cadastrados
                </Text>
                <Image
                  source={require("../../assets/no_data.png")}
                  style={{
                    width: 300,
                    height: 300,
                    resizeMode: "contain",
                  }}
                />
              </View>
            ) : (
              <FlatList
                data={petList}
                keyExtractor={(pet) => String(pet.uid)}
                style={styles.scrollView}
                onRefresh={handleRefresh}
                refreshing={refreshing}
                renderItem={({ item }) => <PetItem key={item.uid} pet={item} />}
              />
            )}

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
        </>
      )}
    </>
  );
}
