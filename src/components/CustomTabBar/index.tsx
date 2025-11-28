import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { style } from './styles';

export default function CustomTabBar({ state, navigation }: any) {
  const tabs = [
    { name: 'Adicionar', label: 'Adicionar', icon: '+' },
    { name: 'Inicio', label: 'Listar', icon: '📋' },
    { name: 'Usuario', label: 'Perfil', icon: '👤' }
  ];

  return (
    <View style={style.container}>
      {state.routes.map((route: any, index: number) => {
        const isFocused = state.index === index;
        const tab = tabs.find(t => t.name === route.name) || tabs[index];

        const onPress = () => {
          if (!isFocused) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.name}
            style={[
              style.tabButton,
              isFocused && style.activeTab
            ]}
            onPress={onPress}
          >
            <Text style={[
              style.tabIcon,
              isFocused && style.activeIcon
            ]}>{tab.icon}</Text>
            <Text style={[
              style.tabLabel,
              isFocused && style.activeLabel
            ]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}