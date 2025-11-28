import {StyleSheet, Dimensions} from 'react-native';
import {themas} from '../../global/themes';

export const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center', // Centralizado
        paddingHorizontal: 30,
        backgroundColor: '#fff'
    },
    boxTop: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20
    },
    boxMid: {
        width: '100%',
        gap: 10, // Espaço mínimo entre campos
        marginBottom: 20
    },
    boxBottom: {
        width: '100%',
        alignItems: 'center',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 24,
        color: themas.colors.gray,
        textAlign: 'center',
        marginBottom: 5
    },
    subtitle: {
        fontSize: 14,
        color: themas.colors.lightGray,
        textAlign: 'center'
    },
    button: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themas.colors.primary,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 8,
        marginTop: 15
    },
    textButton: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold'
    },
    textBotton: {
        fontSize: 14,
        color: themas.colors.lightGray
    },
    linkText: {
        color: themas.colors.primary,
        fontWeight: 'bold',
        marginLeft: 5,
        fontSize: 14
    }
})