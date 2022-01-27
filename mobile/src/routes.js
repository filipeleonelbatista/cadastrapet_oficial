import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  Login,
  Register,
  PetList,
  CreatePet,
  PetProfile,
  PetCode,
  AddVaccine,
  PetHistory,
  PetHistoryView,
  PetVaccineHistory,
  TutorProfile,
  EditPet,
  PetMedicalHistory,
  ViewVaccine
} from "./pages";
import { AuthContextProvider } from "./contexts/AuthContext";

const { Navigator, Screen } = createNativeStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <AuthContextProvider>
          <Navigator screenOptions={{ headerShown: false }}>
            <Screen name="Login" component={Login} />
            <Screen name="Register" component={Register} />
            <Screen name="TutorProfile" component={TutorProfile} />
            <Screen name="PetList" component={PetList} />
            <Screen name="CreatePet" component={CreatePet} />
            <Screen name="EditPet" component={EditPet} />
            <Screen name="PetProfile" component={PetProfile} />
            <Screen name="AddVaccine" component={AddVaccine} />
            <Screen name="PetCode" component={PetCode} />
            <Screen name="PetHistory" component={PetHistory} />
            <Screen name="PetHistoryView" component={PetHistoryView} />
            <Screen name="PetVaccineHistory" component={PetVaccineHistory} />
            <Screen name="PetMedicalHistory" component={PetMedicalHistory} />
            <Screen name="ViewVaccine" component={ViewVaccine} />
          </Navigator>
      </AuthContextProvider>
    </NavigationContainer>
  );
}

export default Routes;
