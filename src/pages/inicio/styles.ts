import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F4F5',
        marginTop:40,
    },
    
    content: {
        padding: 16,
        paddingBottom: 30,
    },

    // HEADER SECTION APRIMORADA
    headerSection: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
    },

    greetingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },

    greetingContent: {
        flex: 1,
        marginRight: 12,
    },

    greetingTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },

    greetingText: {
        fontSize: 24,
        fontWeight: '700',
        color: '#2D2D2D',
        marginRight: 8,
    },

    greetingIcon: {
        marginTop: 2,
    },

    userName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#4A90E2',
        marginBottom: 6,
    },

    welcomeText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 18,
    },

    avatarContainer: {
        alignItems: 'flex-end',
    },

    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#4A90E2',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },

    avatarText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#ffffff',
    },

    // BARRA DE PESQUISA APRIMORADA
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderWidth: 1.5,
        borderColor: '#e0e0e0',
    },

    searchIcon: {
        marginRight: 12,
    },

    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#1a1a1a',
    },

    clearButton: {
        padding: 4,
    },

    filterIcon: {
        marginLeft: 8,
    },

    searchStatus: {
        marginTop: 8,
        paddingHorizontal: 4,
    },

    searchStatusText: {
        fontSize: 13,
        color: '#666',
        fontStyle: 'italic',
    },

    // RESTANTE DO CÓDIGO PERMANECE IGUAL
    statsSection: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 30,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2D2D2D',
        marginBottom: 15,
    },

    statsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },

    statItem: {
        alignItems: 'center',
    },

    statNumber: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#4A90E2',
    },

    statLabel: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
        textAlign: 'center',
    },

    listSection: {
        flex: 1,
    },

    listContent: {
        paddingBottom: 10,
    },

    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        elevation: 2,
    },

    emptyStateTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#666',
        marginTop: 16,
        marginBottom: 8,
    },

    emptyStateText: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
        lineHeight: 20,
    },

    card: {
        backgroundColor: '#FFF',
        borderRadius: 14,
        padding: 18,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },

    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },

    cardNome: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        flex: 1,
    },

    idadeBadge: {
        backgroundColor: '#E3F2FD',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },

    idadeText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#1976D2',
    },

    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },

    cardText: {
        fontSize: 14,
        color: '#444',
        marginLeft: 8,
        flex: 1,
    },

    swipeHint: {
        marginTop: 10,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        alignItems: 'center',
    },

    swipeHintText: {
        fontSize: 11,
        color: '#999',
        fontStyle: 'italic',
    },

    swipeContainer: {
        flexDirection: 'row',
        height: '100%',
        width: 160, 
    },

    swipeButton: {
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 7,
        borderRadius: 14,
    },

    swipeEdit: {
        backgroundColor: '#5bc0de',
    },

    swipeDelete: {
        backgroundColor: '#D9534F',
    },

    swipeShare: {
        backgroundColor: '#5cb85c',
    },

    swipeText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '600',
        marginTop: 4,
        textAlign: 'center',
    },

    tipsSection: {
        backgroundColor: '#FFF8E1',
        borderRadius: 12,
        padding: 16,
        marginTop: 20,
        borderLeftWidth: 4,
        borderLeftColor: '#FFC107',
    },

    tipsTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#333',
        marginBottom: 10,
    },

    tipItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },

    tipIcon: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FF9800',
        marginRight: 8,
        width: 20,
    },

    tipText: {
        fontSize: 12,
        color: '#666',
        flex: 1,
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
    },

    modalContent: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 24,
        width: '100%',
        maxWidth: 400,
        maxHeight: '80%',
    },

    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#1a1a1a',
        textAlign: 'center',
    },

    inputContainer: {
        marginBottom: 16,
    },

    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 6,
    },

    modalInput: {
        borderWidth: 1.5,
        borderColor: '#e0e0e0',
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#fafafa',
    },

    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
        marginTop: 20,
    },

    modalButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    cancelButton: {
        backgroundColor: '#f8f9fa',
        borderWidth: 1.5,
        borderColor: '#ddd',
    },

    cancelButtonText: {
        color: '#666',
        fontWeight: '600',
        fontSize: 16,
    },

    confirmButton: {
        backgroundColor: '#007AFF',
    },

    confirmButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },

    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },

    clearFilterButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
    },

    clearFilterText: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
    },
});