import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform, Modal, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, NavigationProp, useRoute} from '@react-navigation/native';
import {Ionicons, MaterialIcons, Octicons} from '@expo/vector-icons';
import { style } from './styles';
import { Input } from '../../components/input';
import { Button } from '../../components/Button';
import { themas } from '../../global/themes';

type UserData = {
    nome: string;
    email: string;
    dataNascimento: string;
    endereco: string;
    telefone: string;
    senha: string;
}

type RouteParams = {
    fromLogin?: boolean;
}

export default function CadastroPerfil() {
    const navigation = useNavigation<NavigationProp<any>>();
    const route = useRoute();
    const params = route.params as RouteParams;

    // Estados para CADASTRO - SEMPRE INICIAM VAZIOS
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmeSenha, setConfirmeSenha] = useState('');
    const [endereco, setEndereco] = useState('');
    const [telefone, setTelefone] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);
    const [loading, setLoading] = useState(false);

    // Estados para PERFIL
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingField, setEditingField] = useState('');
    const [editValue, setEditValue] = useState('');
    
    // Estados para edição de senha
    const [passwordModalVisible, setPasswordModalVisible] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(true);
    const [showNewPassword, setShowNewPassword] = useState(true);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(true);

    // Verificar se todos os campos estão preenchidos
    const todosCamposPreenchidos = nome.trim() && 
                                  email.trim() && 
                                  dataNascimento.trim() && 
                                  senha.trim() && 
                                  confirmeSenha.trim() && 
                                  endereco.trim() && 
                                  telefone.trim();

    // VERIFICAR SE ESTÁ LOGADO - VERSÃO CORRIGIDA
    async function checkLoginStatus() {
        try {
            const authData = await AsyncStorage.getItem('user_auth');
            
            if (authData) {
                const { email: userEmail, isAuthenticated } = JSON.parse(authData);
                
                if (isAuthenticated && userEmail) {
                    const userDataString = await AsyncStorage.getItem(`user_${userEmail}`);
                    
                    if (userDataString) {
                        const userInfo = JSON.parse(userDataString);
                        setUserData(userInfo);
                        setIsLoggedIn(true);
                        return;
                    }
                }
            }
            
            setIsLoggedIn(false);
            setUserData(null);
            
        } catch (error) {
            console.log('Erro ao verificar login:', error);
            setIsLoggedIn(false);
            setUserData(null);
        }
    }

    // CORREÇÃO: VERIFICAR LOGIN E SEMPRE LIMPAR CAMPOS
    useEffect(() => {
        const initializeComponent = async () => {
            // SEMPRE LIMPA OS CAMPOS PRIMEIRO
            setNome('');
            setEmail('');
            setDataNascimento('');
            setSenha('');
            setConfirmeSenha('');
            setEndereco('');
            setTelefone('');
            
            await checkLoginStatus();
        };

        initializeComponent();
    }, []);

    // CORREÇÃO: RECARREGAR QUANDO A TELA GANHAR FOCO
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // SEMPRE LIMPA OS CAMPOS QUANDO A TELA GANHA FOCO
            setNome('');
            setEmail('');
            setDataNascimento('');
            setSenha('');
            setConfirmeSenha('');
            setEndereco('');
            setTelefone('');
            
            checkLoginStatus();
        });

        return unsubscribe;
    }, [navigation]);

    // CADASTRAR NOVO USUÁRIO
    async function handleRegister() {
        if (!todosCamposPreenchidos) {
            return Alert.alert('Atenção', 'Preencha todos os campos.');
        }

        if (senha !== confirmeSenha) {
            return Alert.alert('Erro', 'As senhas não coincidem');
        }

        if (senha.length < 6) {
            return Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
        }

        setLoading(true);

        try {
            const newUser: UserData = {
                nome: nome.trim(),
                email: email.toLowerCase().trim(),
                dataNascimento,
                endereco,
                telefone,
                senha
            };

            // Verificar se usuário já existe
            const existingUser = await AsyncStorage.getItem(`user_${newUser.email}`);
            if (existingUser) {
                setLoading(false);
                return Alert.alert('Erro', 'Este email já está cadastrado.');
            }

            // Salvar usuário
            await AsyncStorage.setItem(`user_${newUser.email}`, JSON.stringify(newUser));
            
            // Autenticar usuário automaticamente
            await AsyncStorage.setItem('user_auth', JSON.stringify({
                email: newUser.email,
                isAuthenticated: true
            }));

            Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');

            // Navegar para a tela principal
            navigation.reset({
                index: 0,
                routes: [{ name: 'BottomRoutes' }],
            });
            
        } catch (error) {
            console.log(error);
            Alert.alert('Erro', 'Não foi possível salvar os dados.');
        } finally {
            setLoading(false);
        }
    }

    // SAIR DA CONTA
    async function handleLogout() {
        try {
            await AsyncStorage.removeItem('user_auth');
            await AsyncStorage.removeItem('current_user');
            
            setIsLoggedIn(false);
            setUserData(null);
            
            Alert.alert('Sucesso', 'Logout realizado com sucesso!');
            
            // Navegar para Login
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            });
            
        } catch (error) {
            console.log(error);
            Alert.alert('Erro', 'Não foi possível fazer logout.');
        }
    }

    // BOTÃO PARA FAZER NOVO CADASTRO (quando está logado)
    async function handleNewRegister() {
        try {
            await AsyncStorage.removeItem('user_auth');
            await AsyncStorage.removeItem('current_user');
            
            setIsLoggedIn(false);
            setUserData(null);
            
            // Limpar campos
            setNome('');
            setEmail('');
            setDataNascimento('');
            setSenha('');
            setConfirmeSenha('');
            setEndereco('');
            setTelefone('');
            
        } catch (error) {
            console.log(error);
            Alert.alert('Erro', 'Não foi possível preparar para novo cadastro.');
        }
    }

    // EXCLUIR CONTA
    async function handleDeleteAccount() {
        Alert.alert(
            'Confirmar Exclusão',
            'Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.',
            [
                { text: 'Cancelar', style: 'cancel' },
                { 
                    text: 'Excluir', 
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            if (userData) {
                                await AsyncStorage.removeItem(`user_${userData.email}`);
                                await AsyncStorage.removeItem('user_auth');
                                await AsyncStorage.removeItem('current_user');
                                
                                setIsLoggedIn(false);
                                setUserData(null);
                                
                                // Navegar para Login
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Login' }],
                                });
                            }
                        } catch (error) {
                            console.log(error);
                            Alert.alert('Erro', 'Não foi possível excluir a conta.');
                        }
                    }
                }
            ]
        );
    }

    // EDITAR CAMPO DO PERFIL
    async function handleEditField(field: string, value: string) {
        if (!userData) return;

        try {
            const updatedUser = {
                ...userData,
                [field]: value
            };

            await AsyncStorage.setItem(`user_${userData.email}`, JSON.stringify(updatedUser));
            setUserData(updatedUser);
            setModalVisible(false);
            Alert.alert('Sucesso', 'Informação atualizada com sucesso!');
        } catch (error) {
            console.log(error);
            Alert.alert('Erro', 'Não foi possível atualizar a informação.');
        }
    }

    // EDITAR SENHA
    async function handleEditPassword() {
        if (!userData) return;

        if (!currentPassword || !newPassword || !confirmNewPassword) {
            return Alert.alert('Atenção', 'Preencha todos os campos de senha.');
        }

        if (currentPassword !== userData.senha) {
            return Alert.alert('Erro', 'Senha atual incorreta.');
        }

        if (newPassword !== confirmNewPassword) {
            return Alert.alert('Erro', 'As novas senhas não coincidem.');
        }

        if (newPassword.length < 6) {
            return Alert.alert('Erro', 'A nova senha deve ter pelo menos 6 caracteres.');
        }

        try {
            const updatedUser = {
                ...userData,
                senha: newPassword
            };

            await AsyncStorage.setItem(`user_${userData.email}`, JSON.stringify(updatedUser));
            setUserData(updatedUser);
            setPasswordModalVisible(false);
            
            // Limpar campos
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            
            Alert.alert('Sucesso', 'Senha alterada com sucesso!');
        } catch (error) {
            console.log(error);
            Alert.alert('Erro', 'Não foi possível alterar a senha.');
        }
    }

    function openEditModal(field: string, currentValue: string) {
        setEditingField(field);
        setEditValue(currentValue);
        setModalVisible(true);
    }

    function openPasswordModal() {
        setPasswordModalVisible(true);
    }

    function closePasswordModal() {
        setPasswordModalVisible(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
    }

    // Modal de edição normal
    const renderEditModal = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={style.modalContainer}>
                <View style={style.modalContent}>
                    <Text style={style.modalTitle}>
                        Editar {editingField === 'nome' ? 'Nome' : 
                               editingField === 'dataNascimento' ? 'Data de Nascimento' :
                               editingField === 'telefone' ? 'Telefone' : 'Endereço'}
                    </Text>
                    
                    <TextInput
                        style={style.modalInput}
                        value={editValue}
                        onChangeText={setEditValue}
                        placeholder={`Digite o novo ${editingField}`}
                        autoFocus={true}
                    />
                    
                    <View style={style.modalButtons}>
                        <TouchableOpacity
                            style={[style.modalButton, style.cancelButton]}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={style.cancelButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            style={[style.modalButton, style.confirmButton]}
                            onPress={() => handleEditField(editingField, editValue)}
                            disabled={!editValue.trim()}
                        >
                            <Text style={style.confirmButtonText}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );

    // Modal de edição de senha
    const renderPasswordModal = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={passwordModalVisible}
            onRequestClose={closePasswordModal}
        >
            <View style={style.modalContainer}>
                <View style={[style.modalContent, {maxWidth: 450}]}>
                    <Text style={style.modalTitle}>Alterar Senha</Text>
                    
                    {/* Senha Atual */}
                    <View style={style.passwordInputContainer}>
                        <Text style={style.passwordLabel}>Senha Atual</Text>
                        <View style={style.passwordInputWrapper}>
                            <TextInput
                                style={style.passwordInput}
                                value={currentPassword}
                                onChangeText={setCurrentPassword}
                                placeholder="Digite sua senha atual"
                                secureTextEntry={showCurrentPassword}
                                autoCapitalize="none"
                            />
                            <TouchableOpacity 
                                style={style.eyeIcon}
                                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                            >
                                <Octicons 
                                    name={showCurrentPassword ? 'eye-closed' : 'eye'} 
                                    size={20} 
                                    color="#666" 
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Nova Senha */}
                    <View style={style.passwordInputContainer}>
                        <Text style={style.passwordLabel}>Nova Senha</Text>
                        <View style={style.passwordInputWrapper}>
                            <TextInput
                                style={style.passwordInput}
                                value={newPassword}
                                onChangeText={setNewPassword}
                                placeholder="Digite a nova senha"
                                secureTextEntry={showNewPassword}
                                autoCapitalize="none"
                            />
                            <TouchableOpacity 
                                style={style.eyeIcon}
                                onPress={() => setShowNewPassword(!showNewPassword)}
                            >
                                <Octicons 
                                    name={showNewPassword ? 'eye-closed' : 'eye'} 
                                    size={20} 
                                    color="#666" 
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Confirmar Nova Senha */}
                    <View style={style.passwordInputContainer}>
                        <Text style={style.passwordLabel}>Confirmar Nova Senha</Text>
                        <View style={style.passwordInputWrapper}>
                            <TextInput
                                style={style.passwordInput}
                                value={confirmNewPassword}
                                onChangeText={setConfirmNewPassword}
                                placeholder="Confirme a nova senha"
                                secureTextEntry={showConfirmNewPassword}
                                autoCapitalize="none"
                            />
                            <TouchableOpacity 
                                style={style.eyeIcon}
                                onPress={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                            >
                                <Octicons 
                                    name={showConfirmNewPassword ? 'eye-closed' : 'eye'} 
                                    size={20} 
                                    color="#666" 
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    <View style={style.modalButtons}>
                        <TouchableOpacity
                            style={[style.modalButton, style.cancelButton]}
                            onPress={closePasswordModal}
                        >
                            <Text style={style.cancelButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            style={[style.modalButton, style.confirmButton]}
                            onPress={handleEditPassword}
                            disabled={!currentPassword || !newPassword || !confirmNewPassword}
                        >
                            <Text style={style.confirmButtonText}>Alterar Senha</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );

    // TELA DE PERFIL (quando está logado E NÃO veio do Login)
    if (isLoggedIn && userData && !params?.fromLogin) {
        return (
            <ScrollView style={style.profileContainer}>
                {/* Header com nome e email */}
                <View style={style.profileHeader}>
                    <Text style={style.userName}>{userData.nome}</Text>
                    <Text style={style.userEmail}>{userData.email}</Text>
                    
                    {/* Botão para fazer novo cadastro */}
                    <TouchableOpacity
                        style={style.switchButton}
                        onPress={handleNewRegister}
                    >
                        <Ionicons name="person-add-outline" size={16} color="#fff" />
                        <Text style={style.switchButtonText}>  Fazer Novo Cadastro</Text>
                    </TouchableOpacity>
                </View>

                {/* Seção de Informações Pessoais */}
                <Text style={style.sectionTitle}>Informações Pessoais</Text>
                
                <View style={style.infoList}>
                    {/* Nome Completo */}
                    <TouchableOpacity 
                        style={style.infoItem}
                        onPress={() => openEditModal('nome', userData.nome)}
                    >
                        <View style={style.infoContent}>
                            <Text style={style.infoLabel}>NOME COMPLETO</Text>
                            <Text style={style.infoValue}>{userData.nome}</Text>
                        </View>
                        <Ionicons name="create-outline" size={18} color="#666" />
                    </TouchableOpacity>

                    {/* Email */}
                    <View style={style.infoItem}>
                        <View style={style.infoContent}>
                            <Text style={style.infoLabel}>EMAIL</Text>
                            <Text style={style.infoValue}>{userData.email}</Text>
                        </View>
                    </View>

                    {/* Data de Nascimento */}
                    <TouchableOpacity 
                        style={style.infoItem}
                        onPress={() => openEditModal('dataNascimento', userData.dataNascimento)}
                    >
                        <View style={style.infoContent}>
                            <Text style={style.infoLabel}>DATA DE NASCIMENTO</Text>
                            <Text style={style.infoValue}>{userData.dataNascimento}</Text>
                        </View>
                        <Ionicons name="create-outline" size={18} color="#666" />
                    </TouchableOpacity>

                    {/* Telefone */}
                    <TouchableOpacity 
                        style={style.infoItem}
                        onPress={() => openEditModal('telefone', userData.telefone)}
                    >
                        <View style={style.infoContent}>
                            <Text style={style.infoLabel}>TELEFONE</Text>
                            <Text style={style.infoValue}>{userData.telefone}</Text>
                        </View>
                        <Ionicons name="create-outline" size={18} color="#666" />
                    </TouchableOpacity>

                    {/* Endereço */}
                    <TouchableOpacity 
                        style={style.infoItem}
                        onPress={() => openEditModal('endereco', userData.endereco)}
                    >
                        <View style={style.infoContent}>
                            <Text style={style.infoLabel}>ENDEREÇO</Text>
                            <Text style={style.infoValue}>{userData.endereco}</Text>
                        </View>
                        <Ionicons name="create-outline" size={18} color="#666" />
                    </TouchableOpacity>

                    {/* Senha */}
                    <TouchableOpacity 
                        style={style.infoItem}
                        onPress={openPasswordModal}
                    >
                        <View style={style.infoContent}>
                            <Text style={style.infoLabel}>SENHA</Text>
                            <Text style={style.infoValue}>••••••••</Text>
                        </View>
                        <Ionicons name="create-outline" size={18} color="#666" />
                    </TouchableOpacity>
                </View>

                {/* Divisor */}
                <View style={style.divider} />

                {/* Botões de Ação */}
                <View style={style.profileActions}>
                    <TouchableOpacity
                        style={style.editButton}
                        onPress={() => Alert.alert('Dica', 'Toque em qualquer campo para editar')}
                    >
                        <Text style={style.editButtonText}>Editar Perfil</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        style={style.deleteButton}
                        onPress={handleDeleteAccount}
                    >
                        <Text style={style.deleteButtonText}>Excluir Conta</Text>
                    </TouchableOpacity>
                    
                    {/* BOTÃO SAIR DA CONTA */}
                    <TouchableOpacity
                        style={style.logoutButton}
                        onPress={handleLogout}
                    >
                        <Ionicons name="log-out-outline" size={20} color="#666" />
                        <Text style={style.logoutText}>Sair da Conta</Text>
                    </TouchableOpacity>
                </View>

                {renderEditModal()}
                {renderPasswordModal()}
            </ScrollView>
        );
    }

    // TELA DE CADASTRO (quando não está logado OU quando veio do Login)
    return (
        <KeyboardAvoidingView 
            style={{flex: 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView 
                contentContainerStyle={style.scroll}
                showsVerticalScrollIndicator={false}
            >
                <View style={style.container}>
                    <View style={style.boxTop}>
                        <Text style={style.title}>Crie sua conta</Text>
                        <Text style={style.subtitle}>Preencha seus dados para se cadastrar</Text>
                    </View>

                    <View style={style.boxMid}>
                        <Input
                            value={nome}
                            onChangeText={setNome}
                            title='NOME COMPLETO'
                            placeholder='Digite seu nome completo'
                            IconRight={MaterialIcons}
                            IconRightName='person'
                            autoCapitalize='words'
                        />

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
                            value={dataNascimento}
                            onChangeText={(text) => {
        
                            let formattedText = text.replace(/\D/g, ''); // Remove tudo que não é número
        
                            if (formattedText.length > 2) {
                                formattedText = formattedText.substring(0, 2) + '/' + formattedText.substring(2);
                            }
                            if (formattedText.length > 5) {
                                formattedText = formattedText.substring(0, 5) + '/' + formattedText.substring(5, 9);
                            }   
        
                            setDataNascimento(formattedText);
                            }}
                            title='DATA DE NASCIMENTO'
                            placeholder='DD/MM/AAAA'
                            IconRight={MaterialIcons}
                            IconRightName='calendar-today'
                            keyboardType='numeric'
                            maxLength={10} // DD/MM/AAAA = 10 caracteres
                        />

                        <Input
                            value={senha}
                            onChangeText={setSenha}
                            title='SENHA'
                            placeholder='Digite sua senha'
                            IconRight={Octicons}
                            IconRightName={showPassword ? 'eye-closed' : 'eye'}
                            secureTextEntry={showPassword}
                            onIconRightPress={() => setShowPassword(!showPassword)}
                            autoCapitalize='none'
                        />

                        <Input
                            value={confirmeSenha}
                            onChangeText={setConfirmeSenha}
                            title='CONFIRMAR SENHA'
                            placeholder='Digite novamente sua senha'
                            IconRight={Octicons}
                            IconRightName={showConfirmPassword ? 'eye-closed' : 'eye'}
                            secureTextEntry={showConfirmPassword}
                            onIconRightPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            autoCapitalize='none'
                        />

                        <Input
                            value={endereco}
                            onChangeText={setEndereco}
                            title='ENDEREÇO'
                            placeholder='Digite seu endereço completo'
                            IconRight={MaterialIcons}
                            IconRightName='location-on'
                        />

                        <Input
                            value={telefone}
                            onChangeText={(text) => {
        
                            let formattedText = text.replace(/\D/g, ''); // Remove tudo que não é número
        
                            if (formattedText.length > 0) {
                                formattedText = '(' + formattedText;
                            }
                            if (formattedText.length > 3) {
                                formattedText = formattedText.substring(0, 3) + ') ' + formattedText.substring(3);
                            }
                            if (formattedText.length > 10) {
                                formattedText = formattedText.substring(0, 10) + '-' + formattedText.substring(10, 15);
                            }
        
                            setTelefone(formattedText);
                            }}
                            title='TELEFONE'
                            placeholder='(00) 00000-0000'
                            IconRight={MaterialIcons}
                            IconRightName='phone'
                            keyboardType='phone-pad'
                            maxLength={15} // (00) 00000-0000 = 15 caracteres
                        />
                    </View>

                    <View style={style.boxBottom}>
                        <Button
                            text='Cadastrar'
                            loading={loading}
                            onPress={handleRegister}
                            color={themas.colors.primary}
                        />

                        <TouchableOpacity
                            style={style.backButton}
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Ionicons name='arrow-back-outline' size={20} color='#555' />
                            <Text style={style.backText}>Voltar para o login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}