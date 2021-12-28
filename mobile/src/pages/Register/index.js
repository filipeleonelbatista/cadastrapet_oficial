import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useAuth } from "../../hooks/useAuth";
import { cpf as formatCpf } from "../../utils/masks";
import { isStringEmpty } from "../../utils/string";
import { styles } from "./styles";

export function Register() {
  const { navigate } = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cpf, setCpf] = useState("");

  const { RegisterUser } = useAuth();

  const ValidateFields = () => {
    if (isStringEmpty(name)) {
      Alert.alert("Campo vazio", "O campo nome não foi preenchido");
      return true;
    }
    if (isStringEmpty(cpf)) {
      Alert.alert("Campo vazio", "O campo cpf não foi preenchido");
      return true;
    }
    if (isStringEmpty(email)) {
      Alert.alert("Campo vazio", "O campo Email não foi preenchido");
      return true;
    }
    if (isStringEmpty(password)) {
      Alert.alert("Campo vazio", "O campo senha não foi preenchido");
      return true;
    }
    if (isStringEmpty(confirmPassword)) {
      Alert.alert("Campo vazio", "O campo confirmar senha não foi preenchido");
      return true;
    }
    if (password != confirmPassword) {
      Alert.alert(
        "Senhas não coincidem",
        "Senhas digitadas não coincidem. Verifique os campos e tente novamente."
      );
      return true;
    }
  };

  const Register = async () => {
    if (ValidateFields()) return;
    const data = {      
      email,
      password,
      user: {
        name,
        avatar: "",
        cpf,
        email,
        birth_date: "",
        endereco: {
          logradouro: "",
          numero: "",
          bairro: "",
          cep: "",
          cidade: "",
          uf: "",
          pais: "",
        },
        pets: [],
      },
    }
    const isRegistred = await RegisterUser(data)
    if (isRegistred) return navigate("PetList");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableOpacity
        onPress={() => navigate("Login")}
        style={styles.buttonRounded}
      >
        <FontAwesome5 name="arrow-left" size={24} color="#566DEA" />
      </TouchableOpacity>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Cadastrar</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.content}>
            <Input
              label="Nome"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <Input
              label="CPF"
              value={cpf}
              keyboardType="decimal-pad"
              onChangeText={(text) => setCpf(formatCpf(text))}
            />
            <Input
              label="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <Input
              label="Senha"
              value={password}
              onChangeText={(text) => setPassword(text)}
              passwordInputType
            />
            <Input
              label="Confirmar Senha"
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              passwordInputType
            />

            <View style={styles.actions}>
              <Button text="Cadastrar" onPress={Register} />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
