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
    const [dataNascimento, setDataNascimento] = useState('');
    const [perfilSalvo, setPerfilSalvo] = useState(false);
    const [perfilEditado, setPerfilEditado] = useState(false);

    useEffect(() => {
        (async () => {
            const nomeRegistrado = await AsyncStorage.getItem('user_name');
            const emailRegistrado = await AsyncStorage.getItem('user_email');
            const dataRegistrada = await AsyncStorage.getItem('user_date');

            if (nomeRegistrado || emailRegistrado || dataRegistrada) {
                setNome(nomeRegistrado || '');
                setEmail(emailRegistrado || '');
                setDataNascimento(dataRegistrada || '');
                setPerfilSalvo(true);
            }
        })();
    }, [])

    const handleSave = async () => {
        if (!nome || !email || !dataNascimento) {
            return Alert.alert('Atenção', 'Preencha todos os campos.')
        }

        await AsyncStorage.setItem('user_name', nome);
        await AsyncStorage.setItem('user_email', email);
        await AsyncStorage.setItem('user_date', dataNascimento);

        setPerfilEditado(false);
        Alert.alert('Sucesso', 'Informações salvas!');
    }

    const handleLogout = async () => {
        await AsyncStorage.clear();
        navigation.reset({routes: [{name: 'Login'}]})
    }

    return (
        <ScrollView contentContainerStyle={style.scroll}>
            <View style={style.container}>
                <Image
                    source={{
                        uri: 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
                    }}
                    style={style.profileImage}
                />

                <Text style={style.nome}>{nome || 'Usuário'}</Text>

                <View style={style.inputArea}>
                    <Text style={style.label}>Nome:</Text>
                    {perfilEditado ? (
                        <TextInput
                            style={style.input}
                            value={nome}
                            onChangeText={setNome}
                            placeholder='Digite seu nome'
                        />
                    ) : (
                        <Text style={style.textInfo}>{nome || 'Não informado'}</Text>
                    )}

                    <Text style={style.label}>E-mail:</Text>
                    {perfilEditado ? (
                        <TextInput
                            style={style.input}
                            value={email}
                            onChangeText={setEmail}
                            placeholder='Digite seu email'
                            keyboardType='email-address'
                        />
                    ) : (
                        <Text style={style.textInfo}>{email || 'Não informado'}</Text>
                    )}

                    <Text style={style.label}>Data de Nascimento:</Text>
                    {perfilEditado ? (
                        <TextInput
                            style={style.input}
                            value={dataNascimento}
                            onChangeText={setDataNascimento}
                            placeholder='Digite a data (dd/mm/aaaa)'
                            keyboardType='numeric'
                        />
                    ) : (
                        <Text style={style.textInfo}>
                            {dataNascimento || 'Não informada'}
                        </Text>
                    )}
                </View>

                {perfilEditado ? (
                    <TouchableOpacity style={style.saveButton} onPress={handleSave}>
                        <Text style={style.saveButtonText}>Salvar Alterações</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={style.saveButton}
                        onPress={() => setPerfilEditado(true)}
                    >
                        <Text style={style.saveButtonText}>Editar Informações</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity style={style.logoutButton} onPress={handleLogout}>
                    <Ionicons name='exit-outline' size={30} color='gray' />
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}