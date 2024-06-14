import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CaretLeft, Eye, EyeClosed } from "phosphor-react-native";
import Toast from "react-native-toast-message";

const Cadastro = ({ navigation }) => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profileImage, setProfileImage] = useState("");

    const checkPasswordStrength = (password) => {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return passwordPattern.test(password);
    };

    const [passwordError, setPasswordError] = useState(""); // Estado para armazenar o erro da senha
    const [showPassword, setShowPassword] = useState(false);

    const handleCadastro = async () => {
        if (!nome || !email || !cpf || !password || !confirmPassword) {
            showToast("Por favor, preencha todos os campos.");
            return;
        }

        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            showToast("Email inválido. Por favor, insira um email válido.");
            return;
        }

        // Verificar a força da senha
        if (!checkPasswordStrength(password)) {
            setPasswordError("A senha deve conter pelo menos 6 caracteres com letras maiúsculas, minúsculas, números e caracteres especiais.");
            return;
        }

        // Verificar se a senha e a confirmação são iguais
        if (password !== confirmPassword) {
            setPasswordError("As senhas não coincidem.");
            return;
        }

        setPasswordError(""); // Limpar o erro da senha se todas as verificações passarem

        // Caso todas as verificações passem, salvar os dados do usuário
        console.log("Nome:", nome);
        console.log("Email:", email);
        console.log("CPF:", cpf);
        console.log("Password:", password);
        console.log("Profile Image:", profileImage);

        try {
            await AsyncStorage.setItem('userData', JSON.stringify({ nome, email, cpf, password, profileImage }));
            console.log('Dados do usuário salvos com sucesso.');
            navigation.navigate("SelecionarPlano", { email });
        } catch (error) {
            console.error('Erro ao salvar dados do usuário:', error);
        }
    };

    const showToast = (message) => {
        Toast.show({
            type: 'error',
            text1: 'Erro',
            text2: message,
            visibilityTime: 4000,
            autoHide: true,
            bottomOffset: 40,
            onPress: () => Toast.hide(),
        });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <CaretLeft size={32} color="white" />
            </TouchableOpacity>
            <Text style={styles.title}>Cadastre-se</Text>
            <TextInput
                style={styles.input}
                placeholder="Nome"
                onChangeText={(text) => setNome(text)}
                value={nome}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="CPF"
                onChangeText={(text) => setCpf(text)}
                value={cpf}
                keyboardType="numeric"
            />
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Senha"
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowPassword(!showPassword)}
                >
                    <Eye size={24} color="#888" />
                </TouchableOpacity>
            </View>
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            <TextInput
                style={styles.input}
                placeholder="Confirmar Senha"
                onChangeText={(text) => setConfirmPassword(text)}
                value={confirmPassword}
                secureTextEntry={!showPassword} // Mesmo estado de visibilidade da senha
            />
            <TextInput
                style={styles.input}
                placeholder="URL da Foto de Perfil (opcional)"
                onChangeText={(text) => setProfileImage(text)}
                value={profileImage}
            />
            {profileImage ? <Image source={{ uri: profileImage }} style={styles.profileImagePreview} /> : null}
            <TouchableOpacity style={styles.button} onPress={handleCadastro}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#222",
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        marginLeft: 32, // Adicionando margem à esquerda para a flecha
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

export default Cadastro;