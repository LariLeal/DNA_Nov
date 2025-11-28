import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MissingProvider } from './src/context/authContext_desa';
import Login from './src/pages/login';
import Cadastro from './src/pages/usuario'; 
import BottomRoutes from './src/pages/routes/bottom.routes'; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <MissingProvider>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Cadastro" component={Cadastro} />
            <Stack.Screen name="BottomRoutes" component={BottomRoutes} />
          </Stack.Navigator>
        </NavigationContainer>
      </MissingProvider>
    </GestureHandlerRootView>
  );
}