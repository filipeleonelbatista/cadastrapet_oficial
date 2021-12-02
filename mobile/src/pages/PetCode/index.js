import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { QRCode } from 'react-native-custom-qr-codes-expo';
import { styles } from './styles';
import { Input } from '../../components/Input';
import { useNavigation } from '@react-navigation/native';

export function PetCode(){
  const { navigate } = useNavigation();
  return (    
    <View style={styles.container}>  
      <TouchableOpacity onPress={ () => navigate('PetProfile') }  style={styles.buttonRounded}>
        <FontAwesome5 name="arrow-left" size={24} color="#566DEA"/> 
      </TouchableOpacity>     
      <View style={styles.content}>
        <Image source={require('../../assets/doginho.png')} style={styles.petImage} />
        <Text style={styles.title}>Doguinho</Text>  
        <View style={styles.petItem}>
          <QRCode content='12J3CW' logo={require('../../assets/qr.png')}/>
        </View>
        <View style={styles.content}>
          <Input label="Código do pet" value="12J3CW" disabled/>
        </View>   
      </View>   
    </View>
  );
}