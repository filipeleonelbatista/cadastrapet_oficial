import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Input } from "../../components/Input";
import { Loading } from "../../components/Loading";
import { useAuth } from "../../hooks/useAuth";
import { styles } from "./styles";
import * as Linking from "expo-linking";

export function Login() {
  const { navigate } = useNavigation();
  const { isLoggedIn, handleForgotUser, signInUser, isLoaded } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    if (signInUser(email, password)) return navigate("PetList");
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("PetList");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("PetList");
    }
  }, []);

  return (
    <>
      {isLoaded ? (
        <Loading />
      ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <Image
            source={require("../../assets/logo.png")}
            style={styles.image}
          />
          <Text style={styles.subtitle}>Bem vindo novamente</Text>
          <Text style={styles.subsubtitle}>
            Entre para continuar usando o aplicativo
          </Text>
          <View style={styles.buttonGroup}>
            <Input
              label="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <Input
              label="Senha"
              autoCapitalize="none"
              value={password}
              onChangeText={(text) => setPassword(text)}
              passwordInputType
            />
            <TouchableOpacity
              style={{
                paddingVertical: 8,
                marginVertical: 8,
              }}
              onPress={() => handleForgotUser(email)}
            >
              <Text
                style={{
                  marginLeft: 8,
                  fontWeight: "normal",
                  fontSize: 16,
                  fontFamily: "Poppins_400Regular",
                  color: "#566dea",
                }}
              >
                Esqueceu sua senha?
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
              paddingHorizontal: 24,
            }}
          >
            <TouchableOpacity style={styles.buttonLogin} onPress={handleSignIn}>
              <Text
                style={{
                  width: "100%",
                  textAlign: "center",
                  marginLeft: 8,
                  fontWeight: "bold",
                  fontSize: 14,
                  fontFamily: "Poppins_700Bold",
                  color: "#FFF",
                }}
              >
                <FontAwesome5 name="sign-in-alt" size={14} color="#FFF" />{" "}
                Entrar
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              paddingVertical: 8,
              marginVertical: 8,
            }}
            onPress={() => navigate("Register")}
          >
            <Text
              style={{
                marginLeft: 8,
                fontWeight: "normal",
                fontSize: 16,
                fontFamily: "Poppins_700Bold",
                color: "#566dea",
                textAlign: "center",
              }}
            >
              {"Não possui cadastro?\nEntão cadastre-se agora mesmo!"}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={{
                padding: 8,
                marginHorizontal: 4,
              }}
              onPress={() => Linking.openURL("https://wa.me/+5551986320477")}
            >
              <FontAwesome5 name="whatsapp" size={32} color="#566dea" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 8,
                marginHorizontal: 4,
              }}
              onPress={() =>
                Linking.openURL("https://instagram.com/cadastra.pet")
              }
            >
              <FontAwesome5 name="instagram" size={32} color="#566dea" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 8,
                marginHorizontal: 4,
              }}
              onPress={() =>
                Linking.openURL("https://www.facebook.com/cadastra.pet")
              }
            >
              <FontAwesome5 name="facebook" size={32} color="#566dea" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: 8,
                marginHorizontal: 4,
              }}
              onPress={() => Linking.openURL("https://discord.gg/tSTqcBceaA")}
            >
              <FontAwesome5 name="discord" size={32} color="#566dea" />
            </TouchableOpacity>
          </View>

          <Text style={{ ...styles.subsubtitle, fontSize: 12, marginTop: 22 }}>
            Ver. 15032022.9
          </Text>
        </KeyboardAvoidingView>
      )}
    </>
  );
}
