import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cadastro = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [selectedPlan, setSelectedPlan] = useState("");

    const handleCadastro = async () => {
        console.log("Email:", email);
        console.log("Password:", password);
        console.log("Plano selecionado:", selectedPlan);

        try {
            await AsyncStorage.setItem('userData', JSON.stringify({ email, password, selectedPlan }));
            console.log('Dados do usuário salvos com sucesso.');
        } catch (error) {
            console.error('Erro ao salvar dados do usuário:', error);
        }

        navigation.navigate("Login");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry
            />
            <Text style={styles.planTitle}>Escolha um plano:</Text>
            <TouchableOpacity
                style={[styles.planButton, selectedPlan === "Básico" && styles.selectedPlanButton]}
                onPress={() => setSelectedPlan("Básico")}
            >
                <Text style={styles.planButtonText}>Plano Básico</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.planButton, selectedPlan === "Premium" && styles.selectedPlanButton]}
                onPress={() => setSelectedPlan("Premium")}
            >
                <Text style={styles.planButtonText}>Plano Premium</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleCadastro}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: "80%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    planTitle: {
        fontSize: 16,
        marginBottom: 10,
    },
    planButton: {
        backgroundColor: "#eaeaea",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
    },
    selectedPlanButton: {
        backgroundColor: "#0296e5",
    },
    planButtonText: {
        fontSize: 16,
        color: "#333",
    },
    button: {
        backgroundColor: "#0296e5",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
});

export default Cadastro;