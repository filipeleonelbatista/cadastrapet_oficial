import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AppLoading from 'expo-app-loading';
import {Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold, useFonts} from '@expo-google-fonts/poppins';

import Routes from './src/routes';

export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  })

  if(!fontsLoaded)
    return <AppLoading />

  return (
    <>
      <Routes />
      <StatusBar style="dark" />
    </>
  );

}  
