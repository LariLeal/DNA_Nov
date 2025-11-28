import {createContext, useContext} from 'react';
import { MissingPessoa } from '../context/authContext_desa';

export interface MissingContextType {
    perfis: MissingPessoa[];
    savePerfis: (pessoa: MissingPessoa) => void;
    deletePerfis: (id: number) => void;
    filter: (text: string) => void;
}

export interface MissingPessoa {
    id: number;
    nome: string;
    idade: number;
    ultimaLocalizacao: string;
    ultimoDia: string;
    aparencia: string;
}

export const MissingContext = createContext<MissingContextType>({
    perfis: [],
    savePerfis: () => {},
    deletePerfis: () => {},
    filter: () => {}
});

export const useMissing = () => useContext(MissingContext);