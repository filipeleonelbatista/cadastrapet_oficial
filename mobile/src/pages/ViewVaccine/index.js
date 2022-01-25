import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform, Text, View
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ButtonRounded } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../hooks/useAuth';
import { dateToString } from '../../utils/string';
import { styles } from './styles';

export function ViewVaccine() {
  const { navigate } = useNavigation();
  const { selectedVaccine } = useAuth()  

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ButtonRounded onPress={() => navigate('PetVaccineHistory')} transparent >
        <FontAwesome5 name="arrow-left" size={24} color="#566DEA" />
      </ButtonRounded>
      <View style={styles.content}>
        <Text style={styles.title}>Detalhes da Vacina</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View
            style={styles.buttonRoundedWhite}
          >
              <ImageBackground
                source={{
                  uri: selectedVaccine.vaccine_receipt,
                }}
                style={{ width: 96, height: 96 }}
                imageStyle={{ borderRadius: 96 }}
              />
          </View>
          <View style={styles.content}>
            <Input disabled label="Tipo vacina" value={selectedVaccine.vaccine} />
            <Input disabled label="Data" value={dateToString(selectedVaccine.vaccine_application_date)} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}