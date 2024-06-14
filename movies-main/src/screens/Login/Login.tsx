import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

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
                    await AsyncStorage.setItem('isLoggedIn', 'true');
                    console.log('Login bem-sucedido! Redirecionando para a tela Home.');
                    Toast.show({
                        type: 'success',
                        text1: 'Login bem-sucedido!',
                        text2: 'Redirecionando para a tela Home.',
                    });
                    navigation.replace('Tabs');
                } else {
                    console.log('Email ou senha incorretos.');
                    Toast.show({
                        type: 'error',
                        text1: 'Erro no Login',
                        text2: 'Email ou senha incorretos.',
                    });
                }
            } else {
                console.log('Nenhum dado de usuário encontrado.');
                Toast.show({
                    type: 'error',
                    text1: 'Erro no Login',
                    text2: 'Nenhum dado de usuário encontrado.',
                });
            }
        } catch (error) {
            console.error('Erro ao obter dados do usuário:', error);
            Toast.show({
                type: 'error',
                text1: 'Erro no Login',
                text2: 'Erro ao obter dados do usuário.',
            });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo de volta!</Text>
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
                <Text style={styles.signupLink}><span style={styles.naoTemCadastro}>Não tem uma conta?</span> Cadastre-se aqui!</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                <Text style={styles.forgotPasswordLink}>Esqueci a senha</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#222",
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: "#fff",
        fontWeight: "bold",
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 12,
        marginBottom: 10,
        backgroundColor: "#fff",
    },
    button: {
        backgroundColor: "#C3130F",
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 5,
        marginTop: 20,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    signupLink: {
        marginTop: 20,
        color: "#0296e5",
        fontSize: 14,
    },
    naoTemCadastro: {
        marginTop: 20,
        color: "#FFF",
        fontSize: 14,
    },
    forgotPasswordLink: {
        marginTop: 10,
        color: "#0296e5",
        fontSize: 14,
    }
});

export default Login;
