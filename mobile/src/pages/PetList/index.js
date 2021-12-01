import React from 'react';

import {
  View,
  Text,
  Image
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { styles } from './styles';

import {FontAwesome5} from '@expo/vector-icons'

export function PetList(){
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.image} />
      <Text style={styles.title}>Meus Pets</Text>
      <View style={styles.petGroup}>
        <View style={styles.petItem}>
          <Image source={require('../../assets/doginho.png')} style={styles.petImage} />
          <Text style={styles.petName}>Doguinho</Text>
          <View style={styles.petActions}>
            <TouchableOpacity style={styles.buttonRoundedWhite}>
              <FontAwesome5 name="pencil-alt" size={16} color="#566DEA"/> 
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonRoundedRed}>
              <FontAwesome5 name="times" size={16} color="#FFF"/> 
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.petItem}>
          <Image source={require('../../assets/gatinho.png')} style={styles.petImage} />
            <Text style={styles.petName}>Gatinho</Text>
          <View style={styles.petActions}>
            <TouchableOpacity style={styles.buttonRoundedWhite}>
              <FontAwesome5 name="pencil-alt" size={16} color="#566DEA"/> 
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonRoundedRed}>
              <FontAwesome5 name="times" size={16} color="#FFF"/> 
            </TouchableOpacity>
          </View>
        </View>
          <TouchableOpacity style={styles.addPetButton}>
            <FontAwesome5 name="arrow-left" size={16} color="#566DEA" style={{marginRight: 8}}/> 
            <Text style={styles.addPetButtonText}>Adicionar pet</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}