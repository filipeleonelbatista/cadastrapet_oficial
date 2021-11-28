import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Login } from './pages';

const { Navigator, Screen} = createNativeStackNavigator();

function Routes(){
    return (
        <NavigationContainer>
            <Navigator screenOptions={{headerShown: false }}>
                <Screen name="Login" component={Login} />
            </Navigator>
        </NavigationContainer>
    );
}

export default Routes;