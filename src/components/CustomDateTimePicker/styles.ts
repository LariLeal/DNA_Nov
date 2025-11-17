import {StyleSheet} from 'react-native';
import {themas} from '../../global/themes';

export const style = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'baseline',
        backgroundColor: themas.colors.transparent
    },
    container: {
        width: '80%',
        padding: 16,
        backgroundColor: '#fff',
        elevation: 5,
        alignItems: 'center'
    }
})