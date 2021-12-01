import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Login, PetList, CreatePet, PetProfile, PetCode, AddVaccine } from './pages';

const { Navigator, Screen} = createNativeStackNavigator();

function Routes(){
    return (
        <NavigationContainer>
            <Navigator screenOptions={{headerShown: false }}>
                {/* <Screen name="Login" component={Login} /> */}
                {/* <Screen name="PetList" component={PetList} /> */}
                {/* <Screen name="CreatePet" component={CreatePet} /> */}
                {/* <Screen name="PetProfile" component={PetProfile} /> */}
                {/* <Screen name="AddVaccine" component={AddVaccine} /> */}
                <Screen name="PetCode" component={PetCode} />
            </Navigator>
        </NavigationContainer>
    );
}

export default Routes;