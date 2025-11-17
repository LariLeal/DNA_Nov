import React, {createContext, useContext, useEffect, useState} from 'react';
import{View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const MissingContext: any = createContext({});

export interface MissingPessoa {
    id: number;
    nome: string;
    idade: number;
    ultimaLocalizacao: string;
    ultimoDia: string;
    aparencia: string; 
}

export const MissignProvider = (props: any): any => {
    const [perfis, setPerfis] = useState<Array<MissingPessoa>>([]);
    const [backupPerfis, setBackupPerfis] = useState<Array<MissingPessoa>>([]);

    useEffect(() => {
        loadPerfis();
    }, [])

    const loadPerfis = async () => {
        try {
            const storage = await AsyncStorage.getItem("MissingPessoa");
            const data = storage ? JSON.parse(storage) : [];
            setPerfis(data)
            setBackupPerfis(data)
        } catch (err) {
            console.log("Erro ao carregar perfis", err)
        }
    } 

    const savePerfis = async (pessoa: MissingPessoa) => {
        try {
            let updated = [...perfis];
            const index = updated.findIndex(p => p.id === pessoa.id);

            if (index >= 0) {
                updated[index] = pessoa
            } else {
                updated.push(pessoa)
            }

            await AsyncStorage.setItem("missingPerfis", JSON.stringify(updated));
            setPerfis(updated);
            setBackupPerfis(updated)
        } catch (err) {
            Alert.alert("Erro", "Não foi possível salvar o perfil.")
        }
    }

    const deletePerfis = async (pessoa: MissingPessoa) => {
        try {
            const filtered = perfis.filter(p => p.id !== pessoa.id)
            await AsyncStorage.setItem('MissingPerfis', JSON.stringify(filtered))
            setPerfis(filtered)
            setBackupPerfis(filtered)
        } catch (err) {
            console.log("Erro ao excluir", err)
        }
    }

    const filter = (text: string) => {
        if (!text) return setPerfis(backupPerfis);
        const term = text.toLowerCase().trim();

        const filtered = backupPerfis.filter(p =>
            p.nome.toLowerCase().includes(term) ||
            p.ultimaLocalizacao.toLowerCase().includes(term)
        )
        setPerfis(filtered)
    }

    const Card = ({pessoa}: {pessoa: MissingPessoa}) => (
        <View style={styles.card}>
            <Text style={StyleSheet.nome}>{pessoa.nome}</Text>
            <Text>Idade: {pessoa.idade}</Text>
            <Text>Visto pela última vez em: {pessoa.ultimaLocalizacao}</Text>
            <Text>Quando: {pessoa.ultimoDia}</Text>
            <Text>Como estava: {pessoa.aparencia}</Text>
        </View>
    )

    const ListContainer = () => (
        <ScrollView contentContainerStyle={{padding: 20}}>
            {perfis.map((p) => (
                <Card key={p.id} pessoa={p} />
            ))}
        </ScrollView>
    )
}