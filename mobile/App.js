import { Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Routes from './src/routes';
import { LogBox } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';


export default function App() { 
  LogBox.ignoreAllLogs()

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  })

  if(!fontsLoaded)
    return <AppLoading />

  return (
    <RootSiblingParent>
      <StatusBar style={{height: 24}} backgroundColor='#566DEA' style="light" />
      <Routes />
    </RootSiblingParent>
  );

}  
