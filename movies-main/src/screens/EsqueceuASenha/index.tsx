import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons'; 
import { CaretLeft } from "phosphor-react-native";

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); 
    const [errorMessage, setErrorMessage] = useState("");

    const checkPasswordStrength = (password) => {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return passwordPattern.test(password);
    };

    const handleResetPassword = async () => {
        if (!email || !newPassword || !confirmPassword) {
            setErrorMessage("Por favor, preencha todos os campos.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setErrorMessage("As senhas não coincidem.");
            return;
        }

        if (!checkPasswordStrength(newPassword)) {
            setErrorMessage("A senha deve conter pelo menos 6 caracteres com letras maiúsculas, minúsculas, números e caracteres especiais.");
            return;
        }

        try {
            const userData = await AsyncStorage.getItem('userData');
            if (userData) {
                const user = JSON.parse(userData);
                if (user.email === email) {
                    user.password = newPassword;
                    await AsyncStorage.setItem('userData', JSON.stringify(user));
                    setErrorMessage(""); // Limpar a mensagem de erro
                    navigation.navigate('Login');
                } else {
                    setErrorMessage("Email não encontrado.");
                }
            } else {
                setErrorMessage("Nenhum dado de usuário encontrado.");
            }
        } catch (error) {
            setErrorMessage("Erro ao redefinir a senha.");
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <CaretLeft size={32} color="white" />
            </TouchableOpacity>
            <Text style={styles.title}>Redefinir Senha</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
                keyboardType="email-address"
            />
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Nova Senha"
                    onChangeText={(text) => setNewPassword(text)}
                    value={newPassword}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                    <Feather name={showPassword ? "eye" : "eye-off"} size={24} color="#888" />
                </TouchableOpacity>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Confirmar Nova Senha"
                onChangeText={(text) => setConfirmPassword(text)}
                value={confirmPassword}
                secureTextEntry={!showPassword}
            />
            {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null} 
            <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                <Text style={styles.buttonText}>Redefinir Senha</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#222",
        padding: 20,
        justifyContent: 'center'
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        marginLeft: 32,
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
    backButton: {
        position: "absolute",
        top: 20,
        left: 20,
        zIndex: 999,
    },
    errorText: {
        fontSize: 12,
        color: "red",
        marginBottom: 5,
    },
    profileImagePreview: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
        alignSelf: 'center',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    passwordInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 12,
        backgroundColor: "#fff",
        marginBottom: 10
    },
    eyeIcon: {
        position: 'absolute',
        right: 10,
        top: 11
    },
});

export default ForgotPassword;
