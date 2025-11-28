import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, Alert, KeyboardAvoidingView, Platform} from 'react-native';
import {style} from './styles';
import {MaterialIcons, Octicons} from '@expo/vector-icons';
import {themas} from '../../global/themes';
import {Input} from '../../components/input';
import {Button} from '../../components/Button';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
    const navigation = useNavigation<NavigationProp<any>>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [loading, setLoading] = useState(false);

    const getLogin = async () => {
        if (!email || !password) {
            return Alert.alert('Atenção', 'Informe e-mail e senha para continuar!')
        }

        setLoading(true)

        try {
            // Buscar usuário pelo email (sistema do Cadastro)
            const userDataString = await AsyncStorage.getItem(`user_${email.toLowerCase().trim()}`);
            console.log('Dados do usuário encontrados:', userDataString);

            if (userDataString) {
                const userData = JSON.parse(userDataString);
                console.log('Senha digitada:', password);
                console.log('Senha salva:', userData.senha);
                
                // Verificar senha
                if (userData.senha === password) {
                    // Autenticar usuário
                    await AsyncStorage.setItem('user_auth', JSON.stringify({
                        email: userData.email,
                        isAuthenticated: true
                    }));
                    
                    console.log('Login realizado com sucesso para:', userData.email);
                    navigation.reset({routes: [{name: 'BottomRoutes'}]});
                } else {
                    Alert.alert('Acesso negado', 'E-mail ou senha incorretos.');
                }
            } else {
                Alert.alert('Acesso negado', 'E-mail ou senha incorretos.');
            }

        } catch (error) {
            console.log('Erro no login:', error);
            Alert.alert('Erro', 'Não foi possível fazer login.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <KeyboardAvoidingView 
            style={{flex: 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={style.container}>
                <View style={style.boxTop}>
                    <Text style={style.text}>Bem-vindo de volta!</Text>
                    <Text style={style.subtitle}>Faça login para continuar</Text>
                </View>

                <View style={style.boxMid}>
                    <Input
                        value={email}
                        onChangeText={setEmail}
                        title='E-MAIL'
                        placeholder='seu@email.com'
                        IconRight={MaterialIcons}
                        IconRightName='email'
                        autoCapitalize='none'
                        keyboardType='email-address'
                    />

                    <Input
                        value={password}
                        onChangeText={setPassword}
                        title='SENHA'
                        placeholder='Digite sua senha'
                        IconRight={Octicons}
                        IconRightName={showPassword ? 'eye-closed' : 'eye'}
                        secureTextEntry={showPassword}
                        onIconRightPress={() => setShowPassword(!showPassword)}
                        autoCapitalize='none'
                    />
                </View>
 
                <View style={style.boxBottom}>
                    <Button
                        text='Entrar'
                        loading={loading}
                        onPress={getLogin}
                        color={themas.colors.primary}
                    />

                    <View style={{flexDirection: 'row', marginTop: 15, justifyContent: 'center'}}>
                        <Text style={style.textBotton}>Não tem uma conta?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Cadastro', {fromLogin: true})}>
                            <Text style={style.linkText}>
                                Cadastre-se
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}