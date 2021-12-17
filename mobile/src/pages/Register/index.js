import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, View, Image } from 'react-native';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { authentication } from '../../firebase/firebase-config';
import { sendDiscordNotification } from '../../services/discord-notify';
import { styles } from './styles';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {FontAwesome5} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export function Register(){
  const { navigate } = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [birthDate, setBirthDate] = useState('');

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
    });

    console.log(result);

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  const RegisterUser = () => {
    createUserWithEmailAndPassword(authentication, email, password)
    .then((re) => {
      const discordMessage = `
      Novo cadastro realizado pelo app

      **Email:** ${email}
      `
      sendDiscordNotification(discordMessage,'doguinho')
      console.log("Estou aqui! ",re)

      const newUser = {
        id: re.user.uid,
        email: email,
        display_name: display_name,
        created_at: re.user.createdAt,
        photoURL: '', 
        birth_date: birth_date,
        pets: []
      }
      navigate("PetList")
    })
    .catch((err) => {
      console.log("Estou aqui! ",err)
    })
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <TouchableOpacity onPress={ () => navigate('Login') } style={styles.buttonRounded}>
        <FontAwesome5 name="arrow-left" size={24} color="#566DEA"/> 
      </TouchableOpacity>     
      <ScrollView style={styles.scrollView}>
      <View style={styles.content}>
        <Text style={styles.title}>Cadastrar</Text>  
      </View>
      <View style={styles.content}>    
        <TouchableOpacity onPress={pickImage} style={styles.buttonRoundedWhite}>
          {
            !selectedImage ? 
            <FontAwesome5 name="camera" size={48} color="#566DEA"/>
            :            
            <Image source={{ uri: selectedImage.uri, width: selectedImage.width, height: selectedImage.height }} style={{ width: 200, height: 200 }} />
          } 
        </TouchableOpacity>
        <View style={styles.content}>       
          <Input label="Email" value={email} onChangeText={text=>setEmail(text)} />
          <Input label="Senha" value={password} onChangeText={text=>setPassword(text)} passwordInputType />
          <Input label="Confirmar Senha" value={confirmPassword} onChangeText={text=>setConfirmPassword(text)} passwordInputType />
          <Input             
            maxLength={10}
            dateInputType
            label="Data de nascimento" 
            placeholder="dd/mm/aaaa"
            value={birthDate} 
            keyboardType="decimal-pad" 
            onChangeText={ text => setBirthDate(text)}  
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