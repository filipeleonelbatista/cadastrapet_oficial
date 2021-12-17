import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Login, Register, PetList, CreatePet, PetProfile, PetCode, AddVaccine, PetHistory, PetVaccineHistory } from './pages';

const { Navigator, Screen} = createNativeStackNavigator();

function Routes(){
    return (
        <NavigationContainer>
            <Navigator screenOptions={{headerShown: false }}>
                <Screen name="Login" component={Login} />
                <Screen name="Register" component={Register} />
                <Screen name="PetList" component={PetList} />
                <Screen name="CreatePet" component={CreatePet} />
                <Screen name="PetProfile" component={PetProfile} />
                <Screen name="AddVaccine" component={AddVaccine} />
                <Screen name="PetCode" component={PetCode} />
                <Screen name="PetHistory" component={PetHistory} />
                <Screen name="PetVaccineHistory" component={PetVaccineHistory} />
            </Navigator>
        </NavigationContainer>
    );
}

export default Routes;