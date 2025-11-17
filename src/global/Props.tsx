import {createContext, useContext} from 'react';
import {MissingPessoa} from '../context/authContext_desa';

export interface MissignContextType {
    perfis: MissingPessoa[];
    savePerfis: (pessoa: MissingPessoa) => void;
    deletePerfis: (id: number) => void;
    filter: (text: string) => void;
}

export interface MissignPessoa {
    id: number;
    nome: string;
    idade: number;
    ultimaLocalizacao: string;
    ultimoDia: string;
    aparencia: string;
}

export const MissingContext = createContext<MissignContextType>({
    perfis: [],
    savePerfis: () => {},
    deletePerfis: () => {},
    filter: () => {}
});

export const useMissing = () => useContext(MissingContext);