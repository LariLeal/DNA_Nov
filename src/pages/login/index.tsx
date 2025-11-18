import React, {useState, useEffect} from 'react';

import {Text, View, Image, TouchableOpacity, Alert} from 'react-native';
import {style} from './styles';
import {MaterialIcons, Octicons} from '@expo/vector-icons';
import {themas} from '../../global/themes';
import {Input} from '../../components/input';
import {Button} from '../../components/Button';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import BottomRoutes from '../routes/bottom.routes';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
    email: string;
    password: string;
    nome: string;
}

export default function Login() {
    const navigation = useNavigation<NavigationProp<any>>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [loggedIn, setLoggedIn] = useState(false);

    if  (loggedIn) {
        return <BottomRoutes />
    }

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const data = await AsyncStorage.getItem('users')
            if (data) setUsers(JSON.parse(data))
        } catch (err) {
            console.log('Erro ao carregar usuários:', err)
        }
    }

    const getLogin = async () => {
        if (!email || !password) {
            return (
                Alert.alert('Atenção', 'Informe os campos obrigatórios!')
            )
        }

        setLoading(true)

        try {
            const user = users.find(u => u.email === email && u.password === password)

            if (user) {
                await AsyncStorage.setItem('user_email', user.email)
                await AsyncStorage.setItem('user_name', user.nome)

                navigation.reset({routes: [{name: 'BottomRoutes'}]})
            } else {
                Alert.alert('Atenção', 'e-mail ou senha inválidos!')
            }
        } catch (error) {
            console.log('Erro no login:', error)
            Alert.alert('Erro', 'Ocorreu um problema ao fazer login.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={style.conatainer}>
            <View style={style.boxTop}>
                <text style={style.text}>Bem vindo de volta!</text>
            </View>

            <View style={style.boxMid}>
                <Input
                    value={email}
                    onChangeText={setEmail}
                    title='ENDEREÇO DE E-MAIL'
                    IconRight={MaterialIcons}
                    IconRightName='email'
                />

                <Input
                    value={password}
                    onChangeText={setPassword}
                    title='SENHA'
                    IconRight={Octicons}
                    IconRightName={showPassword ? 'eye-closed' : 'eye'}
                    secureTextEntry={showPassword}
                    onIconRightPress={() => setShowPassword(!showPassword)}
                />
            </View>

            <View style={style.boxBottom}>
                <Button
                    text='Entrar'
                    loading={loading}
                    onPress={getLogin}
                    color={themas.colors.primary}
                />

                <View style={{flexDirection: 'row', marginTop: 20, justifyContent: 'center'}}>
                    <Text style={style.textBotton}>Não tem conta?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                        <Text style={{color: themas.colors.primary, fontWeight: 'bold', marginLeft: 5}}>
                            Crie agora!
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}