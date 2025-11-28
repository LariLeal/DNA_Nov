import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface MissingPessoa {
    id: number;
    nome: string;
    idade: string; // Mudei para string para compatibilidade
    ultimaLocalizacao: string;
    ultimoDia: string;
    aparencia: string; 
    contato: string;
}

interface MissingContextData {
    perfis: MissingPessoa[];
    savePerfis: (pessoa: MissingPessoa) => void;
    deletePerfis: (id: number) => void;
    updatePerfis: (pessoaAtualizada: MissingPessoa) => void; // NOVA FUNÇÃO
    setPerfis: React.Dispatch<React.SetStateAction<MissingPessoa[]>>; // ADICIONADO
}

export const MissingContext = createContext<MissingContextData>({} as MissingContextData)

export const MissingProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [perfis, setPerfis] = useState<MissingPessoa[]>([])

    useEffect(() => {
        loadPerfis()
    }, [])

    const loadPerfis = async () => {
        try {
            const storage = await AsyncStorage.getItem('MissingPessoa')
            const data = storage ? JSON.parse(storage) : []
            setPerfis(data)
        } catch (err) {
            console.log('Erro ao carregar perfis', err)
        }
    }

    const savePerfis = async (pessoa: MissingPessoa) => {
        try {
            let updated = [...perfis]
            const index = updated.findIndex(p => p.id === pessoa.id)

            if (index >= 0) {
                updated[index] = pessoa
            } else {
                // Se for um novo perfil, gera um ID único baseado no timestamp
                const newPessoa = {
                    ...pessoa,
                    id: pessoa.id || Date.now()
                }
                updated.push(newPessoa)
            }

            await AsyncStorage.setItem('MissingPessoa', JSON.stringify(updated))
            setPerfis(updated)
            console.log('Perfil salvo:', pessoa)
        } catch (err) {
            console.log('Erro ao salvar perfil', err)
        }
    }

    // NOVA FUNÇÃO: Atualizar perfil específico
    const updatePerfis = async (pessoaAtualizada: MissingPessoa) => {
        try {
            const updated = perfis.map(pessoa => 
                pessoa.id === pessoaAtualizada.id ? pessoaAtualizada : pessoa
            )
            
            await AsyncStorage.setItem('MissingPessoa', JSON.stringify(updated))
            setPerfis(updated)
            console.log('Perfil atualizado:', pessoaAtualizada)
        } catch (err) {
            console.log('Erro ao atualizar perfil', err)
        }
    }

    const deletePerfis = async (id: number) => {
        try {
            const filtered = perfis.filter(p => p.id !== id)
            await AsyncStorage.setItem('MissingPessoa', JSON.stringify(filtered))
            setPerfis(filtered)
            console.log('Perfil deletado:', id)
        } catch (err) {
            console.log('Erro ao excluir', err)
        }
    }

    return (
        <MissingContext.Provider value={{
            perfis, 
            savePerfis, 
            deletePerfis, 
            updatePerfis, // ADICIONADO
            setPerfis // ADICIONADO
        }}>
            {children}
        </MissingContext.Provider>
    )
}

export const useMissing = () => useContext(MissingContext)