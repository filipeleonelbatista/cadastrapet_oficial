import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { styles } from './styles';
import { authentication } from '../../firebase/firebase-config'
import { signInWithEmailAndPassword } from 'firebase/auth';
import {useAuth} from '../../hooks/useAuth'
import { AuthErrorHandler } from "../../utils/handleFirebaseError";

export function Login(){
  const { navigate } = useNavigation();
  const { isLoggedIn } = useAuth()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const SignInUser = () => {
    signInWithEmailAndPassword(authentication, email, password)
    .then((re) => {
      navigate('PetList')
    })
    .catch(err => {
      Alert.alert("Erro", AuthErrorHandler[err.code]);
    })
  }

  useEffect(()=>{
    if(isLoggedIn){
      navigate("PetList")
    }
  }, [isLoggedIn])

  useEffect(()=>{
    if(isLoggedIn){
      navigate("PetList")
    }
  }, [])
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.image} />
      <Text style={styles.subtitle}>Cadastrando e Prolongando Vidas</Text>
      <Text style={styles.subtitle}>ALPHA FECHADO Ver. 110122.123</Text>
      <View style={styles.buttonGroup}>        
        <Input label="Email" value={email} onChangeText={text=>setEmail(text)} />
        <Input label="Senha" value={password} onChangeText={text=>setPassword(text)} secureTextEntry />
        <Button text="Entrar" onPress={ SignInUser } />
        <Button text="Cadastrar" transparent onPress={ () => navigate('Register') } />
      </View>
    </KeyboardAvoidingView>
  );
}