import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../login';
import BottomRoutes from './bottom.routes';
import Cadastro from '../usuario/cadastro';

export default function Routes() {
    const Stack = createStackNavigator()

    return (
        <Stack.Navigator
            initialRouteName='Login'
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: '#fff'
                }
            }}
        >
            <Stack.Screen
                name='Login'
                component={Login}
            />
            <Stack.Screen
                name='Cadastro'
                component={Cadastro}
            />
            <Stack.Screen
                name='BottomRoutes'
                component={BottomRoutes}
            />
        </Stack.Navigator>
    )
}