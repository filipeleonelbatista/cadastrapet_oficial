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
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Loading } from "../../components/Loading";
import { useAuth } from "../../hooks/useAuth";
import { styles } from "./styles";

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
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <Input
              label="Senha"
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
          <Text style={styles.subsubtitle}>Ver. 12032022.8</Text>
        </KeyboardAvoidingView>
      )}
    </>
  );
}

// return (
//   <>
//     {isLoaded ? <Loading /> : (
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         style={styles.container}>
//         <Image source={require('../../assets/logo.png')} style={styles.image} />
//         <Text style={styles.subtitle}>Bem vindo novamente</Text>
//         <Text style={styles.subtitle}>Entre para continuar usando o aplicativo</Text>
//         <View style={styles.buttonGroup}>
//           <Input label="Email" value={email} onChangeText={text => setEmail(text)} />
//           <Input label="Senha" value={password} onChangeText={text => setPassword(text)} passwordInputType />
//           <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', marginVertical: 18 }}>
//             <Button onPress={handleSignIn} >
//               <FontAwesome5 name="sign-in-alt" size={14} color="#FFF" />
//               <Text style={{ marginLeft: 8, fontWeight: 'bold', fontSize: 14, fontFamily: 'Poppins_700Bold', color: "#FFF" }}>
//                 Entrar
//               </Text>
//             </Button>
//             <Button onPress={() => navigate('Register')} >
//               <FontAwesome5 name="user-plus" size={14} color="#FFF" />
//               <Text style={{ marginLeft: 8, fontWeight: 'bold', fontSize: 14, fontFamily: 'Poppins_700Bold', color: "#FFF" }}>
//                 Cadastrar
//               </Text>
//             </Button>
//           </View>
//           <Button text="Esqueci a senha" transparent onPress={() => handleForgotUser(email)} />
//         </View>
//         <Text style={styles.subsubtitle}>Ver. 27012022.7</Text>
//       </KeyboardAvoidingView>
//     )}
//   </>
// );
