import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, ScrollView, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {Ionicons} from '@expo/vector-icons';
import {style} from './styles';

export default function Cadastro() {
    const navigation = useNavigation<NavigationProp<any>>();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmeSenha, setConfirmeSenha] = useState('');
    const [endereco, setEndereco] = useState('');
    const [telefone, setTelefone] = useState('');

    async function handleRegister() {
        if (!nome || !email || !dataNascimento || !senha || !confirmeSenha || !endereco || !telefone) {
            return Alert.alert('Atenção', 'Preencha todos os campos.')
        }

        if (senha !== confirmeSenha) {
            return Alert.alert('Erro', 'As senhas não coincidem')
        }

        try {
            await AsyncStorage.setItem('user_name', nome);
            await AsyncStorage.setItem('user_email', email);
            await AsyncStorage.setItem('user_date', dataNascimento);
            await AsyncStorage.setItem('user_password', senha);
            await AsyncStorage.setItem('user_address', endereco);
            await AsyncStorage.setItem('user_phone', telefone);

            Alert.alert('Sucesso', 'Cadastro realizado com sucesso!')
            navigation.reset({routes: [{name: 'Login'}]})
        } catch (error) {
            console.log(error);
            Alert.alert('Erro', 'Não foi possível salvar os dados.')
        }
    }

    return (
        <ScrollView contentContainerStyle={style.scroll}>
            <View style={style.container}>
                <Text style={style.title}>Crie sua conta</Text>

                <Text style={style.label}>Nome completo:</Text>
                <TextInput
                    style={style.input}
                    placeholder='Digite seu nome'
                    value={nome}
                    onChangeText={setNome}
                />

                <Text style={style.label}>E-mail:</Text>
                <TextInput
                    style={style.input}
                    placeholder='Digite seu e-mail'
                    value={email}
                    onChangeText={setEmail}
                    keyboardType='email-address'
                />

                <Text style={style.label}>Data de nascimento:</Text>
                <TextInput
                    style={style.input}
                    placeholder='Digite a data (dd/mm/aaaa)'
                    value={dataNascimento}
                    onChangeText={setDataNascimento}
                    keyboardType='numeric'
                />

                <Text style={style.label}>Senha:</Text>
                <TextInput
                    style={style.input}
                    placeholder='Digite sua senha'
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry
                />

                <Text style={style.label}>Confirmar senha:</Text>
                <TextInput
                    style={style.input}
                    placeholder='Confirme sua senha'
                    value={confirmeSenha}
                    onChangeText={setConfirmeSenha}
                    secureTextEntry
                />

                <Text style={style.label}>Endereço:</Text>
                <TextInput
                    style={style.input}
                    placeholder='Digite seu endereço'
                    value={endereco}
                    onChangeText={setEndereco}
                />

                <Text style={style.label}>Telefone:</Text>
                <TextInput
                    style={style.input}
                    placeholder='(00) 00000-0000'
                    value={telefone}
                    onChangeText={setTelefone}
                    keyboardType='phone-pad'
                />

                <TouchableOpacity style={style.saveButton} onPress={handleRegister}>
                    <Text style={style.saveButtonText}>Cadastrar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={style.backButton}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Ionicons name='arrow-back-outline' size={24} color='#555' />
                    <Text style={style.backText}>Voltar para o login</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}