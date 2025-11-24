import {StyleSheet} from 'react-native';

export const style = StyleSheet.create({
    scroll: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: 30,
        backgroundColor: '#f5f5f5'
    },
    
    container: {
        alignItems: 'center',
        paddingHorizontal: 20
    },

    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 15
    },

    nome: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333'
    },

    inputArea: {
        width: '100%',
        marginBottom: 25
    },

    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
        color: '#333'
    },

    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        marginBottom: 15
    },

    textInfo: {
        fontSize: 16,
        backgroundColor: '#eaeaea',
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
        color: '#444'
    },

    saveButton: {
        backgroundColor: '#4a90e2',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
        marginBottom: 20,
        width: '100%',
        alignItems: 'center'
    },

    saveButtonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '700'
    },

    logoutButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 50,
        elevation: 3
    }
})