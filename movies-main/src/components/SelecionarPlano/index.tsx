import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const PlanosScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");

    useEffect(() => {
        getEmailFromStorage();
    }, []);

    const getEmailFromStorage = async () => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            if (userData) {
                const { email } = JSON.parse(userData);
                setEmail(email);
            }
        } catch (error) {
            console.error('Erro ao obter dados do usuário:', error);
        }
    };

    const handleSelecionarPlano = async (plano) => {
        try {
            await AsyncStorage.setItem('selectedPlan', plano);
            navigation.navigate('PagamentoFicticio', { email, plano });
        } catch (error) {
            console.error('Erro ao salvar plano selecionado:', error);
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Escolha o seu plano</Text>
            <View style={[styles.planoContainer, { backgroundColor: '#333' }]}>
                <Text style={styles.nomePlano}>Plano Básico</Text>
                <Text style={styles.descricaoPlano}>Assista em um dispositivo por vez. Conteúdo em SD.</Text>
                <Text style={styles.valorPlano}>R$ 19,99/mês</Text>
                <Button title="Selecionar Plano" onPress={() => handleSelecionarPlano('Básico')} color="#C3130F" />
            </View>
            <View style={[styles.planoContainer, { backgroundColor: '#333' }]}>
                <Text style={styles.nomePlano}>Plano Padrão</Text>
                <Text style={styles.descricaoPlano}>Assista em dois dispositivos simultaneamente. Conteúdo em HD.</Text>
                <Text style={styles.valorPlano}>R$ 29,99/mês</Text>
                <Button title="Selecionar Plano" onPress={() => handleSelecionarPlano('Padrão')} color="#C3130F" />
            </View>
            <View style={[styles.planoContainer, { backgroundColor: '#333' }]}>
                <Text style={styles.nomePlano}>Plano Premium</Text>
                <Text style={styles.descricaoPlano}>Assista em quatro dispositivos simultaneamente. Conteúdo em Ultra HD.</Text>
                <Text style={styles.valorPlano}>R$ 39,99/mês</Text>
                <Button title="Selecionar Plano" onPress={() => handleSelecionarPlano('Premium')} color="#C3130F" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#000',
    },
    titulo: {
        fontSize: 24,
        marginBottom: 20,
        color: '#fff',
    },
    planoContainer: {
        width: '100%',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    nomePlano: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#fff',
    },
    descricaoPlano: {
        marginBottom: 10,
        color: '#fff',
    },
    valorPlano: {
        fontSize: 16,
        color: '#007bff',
        marginBottom: 10,
        color: '#fff',
    },
});

export default PlanosScreen;    