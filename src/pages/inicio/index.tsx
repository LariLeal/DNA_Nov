import React, { useRef, useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ScrollView, Alert, TextInput, Modal } from 'react-native';
import { style } from './styles';
import { useMissing, MissingPessoa } from '../../context/authContext_desa';
import { Swipeable } from 'react-native-gesture-handler';
import { AntDesign, MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserData = {
    nome: string;
    email: string;
    dataNascimento: string;
    endereco: string;
    telefone: string;
    senha: string;
}

export default function MissingProfilesScreen() {
    const { perfis, deletePerfis, updatePerfis } = useMissing();
    const swipeableRefs = useRef<Array<Swipeable | null>>([]);
    
    // Estados para edição
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editingPessoa, setEditingPessoa] = useState<MissingPessoa | null>(null);
    const [editForm, setEditForm] = useState({
        nome: '',
        idade: '',
        ultimaLocalizacao: '',
        ultimoDia: '',
        aparencia: ''
    });

    // Novos estados para barra de pesquisa e usuário
    const [searchText, setSearchText] = useState('');
    const [userData, setUserData] = useState<UserData | null>(null);
    const [greeting, setGreeting] = useState('');

    const totalPerfis = perfis.length;
    
    // Filtro para perfis recentes (última semana)
    const perfisRecentes = perfis.filter(p => {
        const umaSemanaAtras = Date.now() - (7 * 24 * 60 * 60 * 1000);
        return p.id > umaSemanaAtras;
    }).length;

    // Filtro para busca
    const filteredPerfis = perfis.filter(pessoa =>
        pessoa.nome.toLowerCase().includes(searchText.toLowerCase()) ||
        pessoa.ultimaLocalizacao.toLowerCase().includes(searchText.toLowerCase()) ||
        pessoa.aparencia.toLowerCase().includes(searchText.toLowerCase())
    );

    // Carregar dados do usuário logado
    const loadUserData = async () => {
        try {
            const authData = await AsyncStorage.getItem('user_auth');
            if (authData) {
                const { email: userEmail, isAuthenticated } = JSON.parse(authData);
                if (isAuthenticated && userEmail) {
                    const userDataString = await AsyncStorage.getItem(`user_${userEmail}`);
                    if (userDataString) {
                        const userInfo = JSON.parse(userDataString);
                        setUserData(userInfo);
                    }
                }
            }
        } catch (error) {
            console.log('Erro ao carregar dados do usuário:', error);
        }
    };

    // Definir saudação baseada no horário
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return 'Bom Dia';
        if (hour >= 12 && hour < 18) return 'Boa Tarde';
        return 'Boa Noite';
    };

    useEffect(() => {
        loadUserData();
        setGreeting(getGreeting());
    }, []);

    // Abrir modal de edição
    const openEditModal = (pessoa: MissingPessoa) => {
        setEditingPessoa(pessoa);
        setEditForm({
            nome: pessoa.nome,
            idade: pessoa.idade,
            ultimaLocalizacao: pessoa.ultimaLocalizacao,
            ultimoDia: pessoa.ultimoDia,
            aparencia: pessoa.aparencia
        });
        setEditModalVisible(true);
    };

    // Salvar edição
    const handleSaveEdit = () => {
        if (!editingPessoa) return;

        if (!editForm.nome.trim() || !editForm.idade.trim() || !editForm.ultimaLocalizacao.trim()) {
            Alert.alert('Atenção', 'Preencha pelo menos nome, idade e última localização.');
            return;
        }

        const updatedPessoa = {
            ...editingPessoa,
            nome: editForm.nome.trim(),
            idade: editForm.idade.trim(),
            ultimaLocalizacao: editForm.ultimaLocalizacao.trim(),
            ultimoDia: editForm.ultimoDia.trim(),
            aparencia: editForm.aparencia.trim()
        };

        updatePerfis(updatedPessoa);
        setEditModalVisible(false);
        setEditingPessoa(null);
        Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    };

    const renderRightActions = (pessoa: MissingPessoa, index: number) => (
        <View style={style.swipeContainer}>
            <TouchableOpacity 
                style={[style.swipeButton, style.swipeEdit]}
                onPress={() => {
                    openEditModal(pessoa);
                    swipeableRefs.current[index]?.close();
                }}
            >
                <Feather name="edit" size={20} color="#fff" />
                <Text style={style.swipeText}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[style.swipeButton, style.swipeDelete]}
                onPress={() => {
                    Alert.alert(
                        'Confirmar Exclusão',
                        `Deseja excluir ${pessoa.nome}?`,
                        [
                            { text: 'Cancelar', style: 'cancel' },
                            { 
                                text: 'Excluir', 
                                style: 'destructive',
                                onPress: () => deletePerfis(pessoa.id) 
                            }
                        ]
                    );
                    swipeableRefs.current[index]?.close();
                }}
            >
                <AntDesign name="delete" size={20} color="#fff" />
                <Text style={style.swipeText}>Excluir</Text>
            </TouchableOpacity>
        </View>
    );

    const renderLeftActions = (pessoa: MissingPessoa, index: number) => (
        <View style={style.swipeContainer}>
            <TouchableOpacity 
                style={[style.swipeButton, style.swipeShare]}
                onPress={() => {
                    const mensagem = `🚨 DESAPARECIDO 🚨\n\nNome: ${pessoa.nome}\nIdade: ${pessoa.idade} anos\nÚltima localização: ${pessoa.ultimaLocalizacao}\nÚltimo dia visto: ${pessoa.ultimoDia}\nAparência: ${pessoa.aparencia}\n\n#Desaparecido #AjudeAEncontrar`;
                    
                    Alert.alert(
                        'Compartilhar',
                        mensagem,
                        [
                            { text: 'Cancelar', style: 'cancel' },
                            { 
                                text: 'Copiar', 
                                onPress: () => {
                                    // Aqui você pode implementar a cópia para área de transferência
                                    Alert.alert('Sucesso', 'Texto copiado para área de transferência!');
                                }
                            }
                        ]
                    );
                    swipeableRefs.current[index]?.close();
                }}
            >
                <Feather name="share-2" size={20} color="#fff" />
                <Text style={style.swipeText}>Compartilhar</Text>
            </TouchableOpacity>
        </View>
    );

    const renderCard = (pessoa: MissingPessoa, index: number) => (
        <Swipeable
            key={pessoa.id}
            ref={(ref) => (swipeableRefs.current[index] = ref)}
            renderRightActions={() => renderRightActions(pessoa, index)}
            renderLeftActions={() => renderLeftActions(pessoa, index)}
            friction={2}
            overshootFriction={8}
        >
            <View style={style.card}>
                <View style={style.cardHeader}>
                    <Text style={style.cardNome}>{pessoa.nome}</Text>
                    <View style={style.idadeBadge}>
                        <Text style={style.idadeText}>{pessoa.idade} anos</Text>
                    </View>
                </View>
                
                <View style={style.infoRow}>
                    <MaterialIcons name="location-on" size={16} color="#666" />
                    <Text style={style.cardText}>{pessoa.ultimaLocalizacao}</Text>
                </View>
                
                <View style={style.infoRow}>
                    <MaterialIcons name="calendar-today" size={16} color="#666" />
                    <Text style={style.cardText}>{pessoa.ultimoDia}</Text>
                </View>
                
                <View style={style.infoRow}>
                    <MaterialIcons name="person" size={16} color="#666" />
                    <Text style={style.cardText}>{pessoa.aparencia}</Text>
                </View>
                
                <View style={style.swipeHint}>
                    <Text style={style.swipeHintText}>
                        ← Compartilhar • Editar/Excluir →
                    </Text>
                </View>
            </View>
        </Swipeable>
    );

    // Modal de edição
    const renderEditModal = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={editModalVisible}
            onRequestClose={() => setEditModalVisible(false)}
        >
            <View style={style.modalContainer}>
                <View style={style.modalContent}>
                    <Text style={style.modalTitle}>Editar Perfil</Text>
                    
                    <View style={style.inputContainer}>
                        <Text style={style.inputLabel}>Nome Completo</Text>
                        <TextInput
                            style={style.modalInput}
                            value={editForm.nome}
                            onChangeText={(text) => setEditForm({...editForm, nome: text})}
                            placeholder="Digite o nome completo"
                        />
                    </View>

                    <View style={style.inputContainer}>
                        <Text style={style.inputLabel}>Idade</Text>
                        <TextInput
                            style={style.modalInput}
                            value={editForm.idade}
                            onChangeText={(text) => setEditForm({...editForm, idade: text})}
                            placeholder="Ex: 67 anos"
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={style.inputContainer}>
                        <Text style={style.inputLabel}>Última Localização</Text>
                        <TextInput
                            style={style.modalInput}
                            value={editForm.ultimaLocalizacao}
                            onChangeText={(text) => setEditForm({...editForm, ultimaLocalizacao: text})}
                            placeholder="Ex: Rua das flores"
                        />
                    </View>

                    <View style={style.inputContainer}>
                        <Text style={style.inputLabel}>Último Dia Visto</Text>
                        <TextInput
                            style={style.modalInput}
                            value={editForm.ultimoDia}
                            onChangeText={(text) => setEditForm({...editForm, ultimoDia: text})}
                            placeholder="Ex: 15/11/2024"
                        />
                    </View>

                    <View style={style.inputContainer}>
                        <Text style={style.inputLabel}>Aparência</Text>
                        <TextInput
                            style={style.modalInput}
                            value={editForm.aparencia}
                            onChangeText={(text) => setEditForm({...editForm, aparencia: text})}
                            placeholder="Descrição da aparência"
                            multiline
                        />
                    </View>
                    
                    <View style={style.modalButtons}>
                        <TouchableOpacity
                            style={[style.modalButton, style.cancelButton]}
                            onPress={() => setEditModalVisible(false)}
                        >
                            <Text style={style.cancelButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            style={[style.modalButton, style.confirmButton]}
                            onPress={handleSaveEdit}
                        >
                            <Text style={style.confirmButtonText}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );

    return (
        <ScrollView 
            style={style.container} 
            contentContainerStyle={style.content}
            showsVerticalScrollIndicator={false}
        >
            {/* Header Aprimorado com Saudação e Pesquisa */}
            <View style={style.headerSection}>
                <View style={style.greetingRow}>
                    <View style={style.greetingContent}>
                        <View style={style.greetingTextContainer}>
                            <Text style={style.greetingText}>{greeting}</Text>
                            <Ionicons 
                                name={greeting === 'Bom Dia' ? 'sunny' : greeting === 'Boa Tarde' ? 'partly-sunny' : 'moon'} 
                                size={20} 
                                color={greeting === 'Bom Dia' ? '#FF9500' : greeting === 'Boa Tarde' ? '#FFCC00' : '#5856D6'} 
                                style={style.greetingIcon}
                            />
                        </View>
                        <Text style={style.userName}>
                            {userData ? userData.nome.split(' ')[0] : 'Usuário'}
                        </Text>
                        <Text style={style.welcomeText}>
                            {totalPerfis === 0 
                                ? 'Vamos cadastrar o primeiro desaparecido?' 
                                : `Você tem ${totalPerfis} ${totalPerfis === 1 ? 'pessoa' : 'pessoas'} cadastrada${totalPerfis === 1 ? '' : 's'}`
                            }
                        </Text>
                    </View>
                    <View style={style.avatarContainer}>
                        <View style={style.avatar}>
                            <Text style={style.avatarText}>
                                {userData ? userData.nome.split(' ')[0].charAt(0).toUpperCase() : 'U'}
                            </Text>
                        </View>
                    </View>
                </View>
                
                {/* Barra de Pesquisa Aprimorada */}
                <View style={style.searchContainer}>
                    <Ionicons name="search" size={20} color="#666" style={style.searchIcon} />
                    <TextInput
                        style={style.searchInput}
                        placeholder="Buscar desaparecidos..."
                        value={searchText}
                        onChangeText={setSearchText}
                        placeholderTextColor="#999"
                    />
                    {searchText.length > 0 ? (
                        <TouchableOpacity 
                            style={style.clearButton}
                            onPress={() => setSearchText('')}
                        >
                            <Ionicons name="close-circle" size={20} color="#999" />
                        </TouchableOpacity>
                    ) : (
                        <Ionicons name="options" size={20} color="#CCC" style={style.filterIcon} />
                    )}
                </View>

                {/* Status da Busca */}
                {searchText.length > 0 && (
                    <View style={style.searchStatus}>
                        <Text style={style.searchStatusText}>
                            {filteredPerfis.length === 0 
                                ? 'Nenhum resultado para "' + searchText + '"'
                                : `${filteredPerfis.length} ${filteredPerfis.length === 1 ? 'resultado' : 'resultados'} para "${searchText}"`
                            }
                        </Text>
                    </View>
                )}
            </View>

            {/* Estatísticas */}
            <View style={style.statsSection}>
                <Text style={style.sectionTitle}>📊 Estatísticas</Text>
                <View style={style.statsGrid}>
                    <View style={style.statItem}>
                        <Text style={style.statNumber}>{totalPerfis}</Text>
                        <Text style={style.statLabel}>Total de Perfis</Text>
                    </View>
                    <View style={style.statItem}>
                        <Text style={style.statNumber}>{perfisRecentes}</Text>
                        <Text style={style.statLabel}>Última semana</Text>
                    </View>
                </View>
            </View>

            {/* Lista de Desaparecidos */}
            <View style={style.listSection}>
                <View style={style.listHeader}>
                    <Text style={style.sectionTitle}>
                        📋 Pessoas Desaparecidas {filteredPerfis.length > 0 && `(${filteredPerfis.length})`}
                    </Text>
                    {searchText.length > 0 && (
                        <TouchableOpacity 
                            style={style.clearFilterButton}
                            onPress={() => setSearchText('')}
                        >
                            <Text style={style.clearFilterText}>Limpar filtro</Text>
                        </TouchableOpacity>
                    )}
                </View>
                
                {filteredPerfis.length === 0 ? (
                    <View style={style.emptyState}>
                        <MaterialIcons 
                            name={searchText.length > 0 ? "search-off" : "person-outline"} 
                            size={50} 
                            color="#CCCCCC" 
                        />
                        <Text style={style.emptyStateTitle}>
                            {searchText.length > 0 ? 'Nenhum resultado encontrado' : 'Nenhum perfil cadastrado'}
                        </Text>
                        <Text style={style.emptyStateText}>
                            {searchText.length > 0 
                                ? 'Tente buscar com outros termos'
                                : 'Use a aba "Adicionar" para cadastrar\npessoas desaparecidas.'
                            }
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        data={filteredPerfis}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item, index }) => renderCard(item, index)}
                        scrollEnabled={false}
                        contentContainerStyle={style.listContent}
                    />
                )}
            </View>

            {filteredPerfis.length > 0 && (
                <View style={style.tipsSection}>
                    <Text style={style.tipsTitle}>💡 Como usar:</Text>
                    <View style={style.tipItem}>
                        <Text style={style.tipIcon}>→</Text>
                        <Text style={style.tipText}>Arraste para a direita para Editar/Excluir</Text>
                    </View>
                    <View style={style.tipItem}>
                        <Text style={style.tipIcon}>←</Text>
                        <Text style={style.tipText}>Arraste para a esquerda para Compartilhar</Text>
                    </View>
                </View>
            )}

            {renderEditModal()}
        </ScrollView>
    );
}