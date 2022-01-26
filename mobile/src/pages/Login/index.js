import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { styles } from './styles';
import { authentication } from '../../firebase/firebase-config'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '../../hooks/useAuth'
import { AuthErrorHandler } from "../../utils/handleFirebaseError";
import { FontAwesome5 } from "@expo/vector-icons";

export function Login() {
  const { navigate } = useNavigation();
  const { isLoggedIn, handleForgotUser } = useAuth()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const SignInUser = () => {
    signInWithEmailAndPassword(authentication, email, password)
      .then((re) => {
        navigate('PetList')
      })
      .catch(err => {
        console.log(err)
        Alert.alert("Erro", AuthErrorHandler[err.code]);
      })
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate("PetList")
    }
  }, [isLoggedIn])

  useEffect(() => {
    if (isLoggedIn) {
      navigate("PetList")
    }
  }, [])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.image} />
      <Text style={styles.subtitle}>Cadastrando e Prolongando Vidas</Text>
      <View style={styles.buttonGroup}>
        <Input label="Email" value={email} onChangeText={text => setEmail(text)} />
        <Input label="Senha" value={password} onChangeText={text => setPassword(text)} passwordInputType />
        <View style={{flexDirection:'row', width: '100%', justifyContent: 'center', marginVertical: 18}}>
          <Button onPress={SignInUser} >
            <FontAwesome5 name="sign-in-alt" size={14} color="#FFF" />
            <Text style={{ marginLeft: 8, fontWeight: 'bold', fontSize: 14, fontFamily: 'Poppins_700Bold', color: "#FFF"}}>
              Entrar
            </Text>
          </Button>
          <Button onPress={() => navigate('Register')} >
            <FontAwesome5 name="user-plus" size={14} color="#FFF" />
            <Text style={{ marginLeft: 8, fontWeight: 'bold', fontSize: 14, fontFamily: 'Poppins_700Bold', color: "#FFF"}}>
              Cadastrar
            </Text>
          </Button>
        </View>
        <Button text="Esqueci a senha" transparent onPress={() => handleForgotUser(email)} />
      </View>
      <Text style={styles.subsubtitle}>Ver. 26012022.4</Text>
    </KeyboardAvoidingView>
  );
}