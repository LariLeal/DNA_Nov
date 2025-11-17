import React, {useState, useRef} from 'react';
import {View, Text, FlatList, TouchableOpacity, ScrollView, Alert} from 'react-native';
import {style} from './styles';
import {Input} from '../../components/input';
import { themas } from '../../global/themes';
import {useMissing, MissingPessoa} from '../../context/authContext_desa';
import {Swipeable} from 'react-native-gesture-handler';
import {AntDesign} from '@expo/vector-icons';

export default function MissingProfilesScreen() {
    const {perfis, savePerfis, deletePerfis, filter} = useMissing();
    const swipeableRefs = useRef<Array<Swipeable | null>>([]);

    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const [ultimaLocalizacao, setUltimaLocalizacao] = useState('');
    const [ultimoDia, setUltimoDia] = useState('');
    const [aparencia, setAparencia] = useState('');

    const handleSave = () => {
        if (!nome || !idade || !ultimaLocalizacao || !ultimoDia || !aparencia) {
            Alert.alert('Erro', 'Preencha todos os campos!')
            return
        }

        const novaPessoa: MissingPessoa = {
            id: Date.now(),
            nome,
            idade: Number(idade),
            ultimaLocalizacao,
            ultimoDia,
            aparencia
        }

        savePerfis(novaPessoa)
        Alert.alert('Sucesso', 'Perfil salvo com sucesso!')

        setNome('');
        setIdade('');
        setUltimaLocalizacao('');
        setUltimoDia('');
        setAparencia('');
    }

    const renderRightActions = () => (
        <View style={[style.button, {backgroundColor: themas.colors.red}]}>
            <AntDesign name='delete' size={20} color='#fff' />
        </View>
    )

    const handleSwipeOpen = (direction: 'right' | 'left', pessoa: MissingPessoa, index: number) => {
        if (direction === 'right') {
            deletePerfis(pessoa.id)
        } else {
            setNome(pessoa.nome);
            setIdade(pessoa.idade.toString());
            setUltimaLocalizacao(pessoa.ultimaLocalizacao);
            setUltimoDia(pessoa.ultimoDia);
            setAparencia(pessoa.aparencia)
        }
        swipeableRefs.current[index]?.close?.();
    }

    const renderLeftActions = () => (
        <View style={[style.button, {backgroundColor: themas.colors.blueLight}]}>
            <AntDesign name='edit' size={20} color='#fff' />
        </View>
    )

    const renderCard = (pessoa: MissingPessoa, index: number) => (
        <Swipeable
            ref={(ref) => (swipeableRefs.current[index] = ref)}
            key={pessoa.id}
            renderRightActions={renderRightActions}
            renderLeftActions={renderLeftActions}
            onSwipeableOpen={(direction) => handleSwipeOpen(direction, pessoa, index)}
        >
            <View style={style.card}>
                <Text style={style.nome}>{pessoa.nome}</Text>
                <Text>Idade: {pessoa.idade}</Text>
                <Text>Última localização {pessoa.ultimaLocalizacao}</Text>
                <Text>Último dia visto: {pessoa.ultimoDia}</Text>
                <Text>Aparência: {pessoa.aparencia}</Text>
            </View>
        </Swipeable>
    )

    return (
        <View style={style.container}>
            <ScrollView contentContainerStyle={{padding: 20}}>
                <Text style={style.header}>Adicionar / Editar perfil</Text>

                <Input placeholder='Nome' value={nome} onChangeText={setNome} />
                <Input placeholder='Idade' value={idade} onChangeText={setIdade} keyboardType='numeric' />
                <Input placeholder='Última Localização' value={ultimaLocalizacao} onChangeText={setUltimaLocalizacao} />
                <Input placeholder='Último Dia Visto' value={ultimoDia} onChangeText={setUltimoDia} />
                <Input placeholder='Aparência' value={aparencia} onChangeText={setAparencia} />

                <TouchableOpacity
                    style={[style.button, {backgroundColor: themas.colors.primary, marginTop: 20}]}
                    onPress={handleSave}
                >
                    <Text style={[style.buttonText, {color: '#fff'}]}>Salvar</Text>
                </TouchableOpacity>

                <Text style={[style.header, {marginTop: 30}]}>Perfis De Desaparecidos</Text>
                <FlatList
                    data={perfis}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item, index}) => renderCard(item, index)}
                    contentContainerStyle={{paddingVertical: 10}}
                />
            </ScrollView>
        </View>
    )
}