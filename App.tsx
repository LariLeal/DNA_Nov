import React from 'react';
import {StatusBar, StyleSheet, useColorScheme, View, Text} from 'react-native';
import {SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context';

const App: React.FC = () => {
    const isDarkMode = useColorScheme() === 'dark';

    return (
        <SafeAreaProvider>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <AppContent />
        </SafeAreaProvider>
    )
}

const AppContent: React.FC = () => {
    const safeAreaInsets = useSafeAreaInsets();

    return (
        <View style={[styles.container, {paddingTop: safeAreaInsets.top}]}>
            <View style={styles.content}>
                <Text style={styles.title}>DNA App</Text>
                <Text style={styles.subtitle}>Seu App está funcionando!</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center'
    }
})

export default App;