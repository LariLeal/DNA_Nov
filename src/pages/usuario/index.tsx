import React, {useState, useEffect} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity, Alert, ScrollView} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {style} from './styles';

export default function Usuario() {
    const navigation = useNavigation<NavigationProp<any>>();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [dataNascimento, setDateNascimento] = useState('');
    const []
}