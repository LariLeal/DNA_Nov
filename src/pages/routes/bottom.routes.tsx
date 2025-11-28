import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MissingProvider } from '../../context/authContext_desa';
import CustomTabBar from '../../components/CustomTabBar';

const AdicionarScreen = require('../adicionar/index.tsx').default;
const InicioScreen = require('../inicio/index.tsx').default; 
const UsuarioScreen = require('../usuario/index.tsx').default;

const Tab = createBottomTabNavigator();

export default function BottomRoutes() {
  return (
    <MissingProvider>
      <Tab.Navigator
        screenOptions={{
          headerShown: false
        }}
        tabBar={props => <CustomTabBar {...props} />}
        initialRouteName="Inicio"
      >
        <Tab.Screen
          name="Adicionar"
          component={AdicionarScreen}
        />
        <Tab.Screen
          name="Inicio" 
          component={InicioScreen}
        />
        <Tab.Screen
          name="Usuario"
          component={UsuarioScreen}
        />
      </Tab.Navigator>
    </MissingProvider>
  );
}