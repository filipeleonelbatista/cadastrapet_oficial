import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from "react";
import {
  Alert, ImageBackground, KeyboardAvoidingView,
  Platform,
  Text,
  View
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Button, ButtonRounded } from "../../components/Button";
import { Input } from "../../components/Input";
import { authentication, db } from "../../firebase/firebase-config";
import { uploadImageAsync } from '../../firebase/functions';
import { sendDiscordNotification } from "../../services/discord-notify";
import { getCepInformation } from "../../utils/cep";
import { AuthErrorHandler } from "../../utils/handleFirebaseError";
import { cep as formatCep, cpf as formatCpf } from "../../utils/masks";
import { isStringEmpty } from "../../utils/string";
import { styles } from "./styles";

export function TutorProfile() {
  const { navigate } = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [pais, setPais] = useState("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      base64: true,

    });

    if (!result.cancelled) {
      setSelectedImage(result);
    }
  };

  const handleCep = async () => {
    const cepResult = await getCepInformation(cep);
    if (!cepResult.data) return;

    setLogradouro(cepResult.data.logradouro);
    setCidade(cepResult.data.localidade);
    setBairro(cepResult.data.bairro);
    setUf(cepResult.data.uf);
    setPais("Brasil");
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
    if (isStringEmpty(birthDate)) {
      Alert.alert(
        "Campo vazio",
        "O campo data de nascimento não foi preenchido"
      );
      return true;
    }

    if (password != confirmPassword) {
      Alert.alert(
        "Senhas não coincidem",
        "Os campos senha e confirmar senha devem ser iguais"
      );
      return true;
    }

    if (isStringEmpty(logradouro)) {
      Alert.alert("Campo vazio", "O campo logradouro não foi preenchido");
      return true;
    }
    if (isStringEmpty(numero)) {
      Alert.alert("Campo vazio", "O campo numero não foi preenchido");
      return true;
    }
    if (isStringEmpty(bairro)) {
      Alert.alert("Campo vazio", "O campo bairro não foi preenchido");
      return true;
    }
    if (isStringEmpty(cep)) {
      Alert.alert("Campo vazio", "O cep não foi preenchido");
      return true;
    }
    if (isStringEmpty(cidade)) {
      Alert.alert("Campo vazio", "O cidade não foi preenchido");
      return true;
    }
    if (isStringEmpty(uf)) {
      Alert.alert("Campo vazio", "O uf não foi preenchido");
      return true;
    }
    if (isStringEmpty(pais)) {
      Alert.alert("Campo vazio", "O pais não foi preenchido");
      return true;
    }
  }
  
  const RegisterUser = async () => {
    if(ValidateFields()) return;   
    createUserWithEmailAndPassword(authentication, email, password)
      .then(async (re) => {
        let uploadURLImage = '';

        if(!selectedImage.cancelled){
          uploadURLImage = await uploadImageAsync(selectedImage.uri, '/users')
        }

        const data = {
          uid: re.user.uid,
          name,
          avatar: uploadURLImage,
          cpf,
          email,
          password,
          birth_date: birthDate,
          endereco: {
            logradouro,
            numero,
            bairro,
            cep,
            cidade,
            uf,
            pais,
          },
          pets: []
        };
        try{
          await setDoc(doc(db, 'users', re.user.uid), data)
          sendDiscordNotification(`Novo cadastro realizado pelo app\n\n**Email:** ${email}`, "doguinho");
          navigate("PetList");
        }catch(err){          
          sendDiscordNotification(`Houve um erro ao cadastrar o usuário\n\n ${JSON.stringify(data)}\n\nlog do erro:\n\n${err}`, "doguinho");
          Alert.alert("Erro", "Houve um erro ao cadastrar o usuario. Tente novamente mais tarde");
          navigate("Login");
        }
      })
      .catch((err) => {        
        Alert.alert("Erro", AuthErrorHandler[err.code]);
        navigate("Login");
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ButtonRounded
        onPress={() => navigate("Login")} transparent
      >
        <FontAwesome5 name="arrow-left" size={24} color="#566DEA" />
      </ButtonRounded>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Cadastrar</Text>
        </View>
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
                style={{width:96, height:96 }}
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
            <Input
              maxLength={10}
              dateInputType
              label="Data de nascimento"
              placeholder="dd/mm/aaaa"
              value={birthDate}
              keyboardType="decimal-pad"
              onChangeText={(text) => setBirthDate(text)}
            />

            <Text style={styles.title}>Endereço</Text>

            <Input
              label="Cep"
              value={cep}
              onChangeText={(text) => setCep(formatCep(text))}
              onBlur={handleCep}
              keyboardType="decimal-pad"
              maxLength={9}
            />
            <Input
              label="Logradouro"
              value={logradouro}
              onChangeText={(text) => setLogradouro(text)}
            />
            <Input
              label="Numero"
              value={numero}
              onChangeText={(text) => setNumero(text)}
              keyboardType="decimal-pad"
            />
            <Input
              label="Bairro"
              value={bairro}
              onChangeText={(text) => setBairro(text)}
            />
            <Input
              label="Cidade"
              value={cidade}
              onChangeText={(text) => setCidade(text)}
            />
            <Input label="Uf" value={uf} onChangeText={(text) => setUf(text)} />
            <Input
              label="Pais"
              value={pais}
              onChangeText={(text) => setPais(text)}
            />

            <View style={styles.actions}>
              <Button text="Cadastrar" onPress={RegisterUser} />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
