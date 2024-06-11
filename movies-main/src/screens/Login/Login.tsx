import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        console.log("Email:", email);
        console.log("Password:", password);

        try {
            const userData = await AsyncStorage.getItem('userData');
            if (userData) {
                const { email: savedEmail, password: savedPassword } = JSON.parse(userData);

                if (savedEmail === email && savedPassword === password) {
                    // Após o login bem-sucedido, armazenar indicador de login
                    await AsyncStorage.setItem('isLoggedIn', 'true');
                    console.log('Login bem-sucedido! Redirecionando para a tela Home.');
                    navigation.navigate('MainHome'); // Correção aqui
                } else {
                    console.log('Email ou senha incorretos.');
                }
            } else {
                console.log('Nenhum dado de usuário encontrado.');
            }
        } catch (error) {
            console.error('Erro ao obter dados do usuário:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
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
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
                <Text style={styles.signupLink}>Criar conta</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1E1E1E",
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: "#fff",
    },
    input: {
        width: "80%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        backgroundColor: "#fff",
        color: "#000",
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
    signupLink: {
        marginTop: 20,
        color: "#0296e5",
        fontSize: 16,
    },
});

export default Login;