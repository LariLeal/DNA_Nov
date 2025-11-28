import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Adicionar from './src/pages/adicionar';
import Inicio from './src/pages/inicio/index';
import Usuario from './src/pages/usuario/index';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator 
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Adicionar" component={Adicionar} />
      <Tab.Screen name="Inicio" component={Inicio} />
      <Tab.Screen name="Usuario" component={Usuario} />
    </Tab.Navigator>
  );
}