import React from 'react';
import {ActivityIndicator, TouchableHighlightProps, TouchableOpacity, Text, StyleSheet} from 'react-native';

type Props = TouchableHighlightProps & {
    text: string;
    loading?: boolean;
    color?: string;
}

export function Button({text, loading, color, ...rest}: Props) {
    return (
        <TouchableOpacity
            style={[styles.button, {backgroundColor: color || '#000'}]}
            {...rest}
            activeOpacity={0.6}
        >
            {loading ? (
                <ActivityIndicator color='#fff' />
            ) : (
                <Text style={styles.textButton}>{text}</Text>
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent:'center'
    },
    textButton: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
})