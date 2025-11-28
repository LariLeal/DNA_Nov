import React, { useState } from 'react';
import { View, Text, ScrollView, Alert , TouchableOpacity} from 'react-native';
import { Input } from '../../components/input';
import { useMissing } from '../../context/authContext_desa';
import { style } from './styles';

export default function Adicionar() {
  const { savePerfis } = useMissing();
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [ultimaLocalizacao, setUltimaLocalizacao] = useState('');
  const [ultimoDia, setUltimoDia] = useState('');
  const [aparencia, setAparencia] = useState('');
  const [contato, setContato] = useState('');

  // Função para formatar telefone: (11) 99999-9999
  const formatarTelefone = (text: string) => {
    // Remove tudo que não é número
    const numbers = text.replace(/\D/g, '');
    
    // Limita a 11 caracteres (DDD + 9 dígitos)
    const limitedNumbers = numbers.slice(0, 11);
    
    // Aplica a formatação
    if (limitedNumbers.length <= 2) {
      return limitedNumbers;
    } else if (limitedNumbers.length <= 7) {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2)}`;
    } else {
      return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2, 7)}-${limitedNumbers.slice(7, 11)}`;
    }
  };

  // Função para formatar data: 15/11/2024
  const formatarData = (text: string) => {
    // Remove tudo que não é número
    const numbers = text.replace(/\D/g, '');
    
    // Limita a 8 caracteres (DD/MM/AAAA)
    const limitedNumbers = numbers.slice(0, 8);
    
    // Aplica a formatação
    if (limitedNumbers.length <= 2) {
      return limitedNumbers;
    } else if (limitedNumbers.length <= 4) {
      return `${limitedNumbers.slice(0, 2)}/${limitedNumbers.slice(2)}`;
    } else {
      return `${limitedNumbers.slice(0, 2)}/${limitedNumbers.slice(2, 4)}/${limitedNumbers.slice(4, 8)}`;
    }
  };

  const handleSalvar = () => {
    if (!nome.trim() || !idade.trim() || !ultimaLocalizacao.trim() || !ultimoDia.trim() || !aparencia.trim() || !contato.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    if (isNaN(Number(idade)) || Number(idade) <= 0) {
      Alert.alert('Erro', 'Idade deve ser um número válido!')
      return;
    }

    // Remove a formatação antes de salvar
    const contatoLimpo = contato.replace(/\D/g, '');
    const dataLimpa = ultimoDia.replace(/\D/g, '');

    const novaPessoa = {
      id: Date.now(),
      nome: nome.trim(),
      idade: Number(idade),
      ultimaLocalizacao: ultimaLocalizacao.trim(),
      ultimoDia: dataLimpa, // Salva sem formatação
      aparencia: aparencia.trim(),
      contato: contatoLimpo // Salva sem formatação
    };

    savePerfis(novaPessoa);
    Alert.alert('Sucesso', 'Desaparecido cadastrado!');

    setNome(''); 
    setIdade(''); 
    setUltimaLocalizacao(''); 
    setUltimoDia(''); 
    setAparencia('');
    setContato('');
  };

  // Funções para lidar com a mudança dos campos formatados
  const handleContatoChange = (text: string) => {
    const formatted = formatarTelefone(text);
    setContato(formatted);
  };

  const handleDataChange = (text: string) => {
    const formatted = formatarData(text);
    setUltimoDia(formatted);
  };

  const todosCamposPreenchidos = nome.trim() && idade.trim() && ultimaLocalizacao.trim() 
    && ultimoDia.trim() && aparencia.trim() && contato.trim();

  return (
    <ScrollView style={style.container} contentContainerStyle={style.content}>
      <Text style={style.header}>Adicionar Desaparecido</Text>

    <View style={style.formContainer}>
      <Input 
        placeholder="Nome completo" 
        value={nome} 
        onChangeText={setNome} 
      />
      
      <Input 
        placeholder="Idade" 
        value={idade} 
        onChangeText={setIdade} 
        keyboardType="numeric" 
        maxLength={3}
      />
      
      <Input 
        placeholder="Última localização vista" 
        value={ultimaLocalizacao} 
        onChangeText={setUltimaLocalizacao} 
      />
      
      <Input 
        placeholder="Último dia visto (ex: 15/11/2024)" 
        value={ultimoDia} 
        onChangeText={handleDataChange}
        keyboardType="numeric"
        maxLength={10}
      />
      
      <Input 
        placeholder="Aparência (roupas, características)" 
        value={aparencia} 
        onChangeText={setAparencia} 
        multiline 
        numberOfLines={3} 
      />
      
      <Input 
        placeholder="Número para contato (ex: (11) 99999-9999)" 
        value={contato} 
        onChangeText={handleContatoChange}
        keyboardType="phone-pad"
        maxLength={15}
      />

      <TouchableOpacity
        style={[style.button, !todosCamposPreenchidos && style.buttonDisabled]}
        onPress={handleSalvar}
        disabled={!todosCamposPreenchidos}
      >
        <Text style={style.buttonText}>Salvar Desaparecido</Text>
      </TouchableOpacity>
    </View>

    <Text style={style.infoText}>
      Preencha todos os campos com informações precisas para ajudar na localização.
    </Text>
    </ScrollView>
  );
}