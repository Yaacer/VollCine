import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Picker } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importe o AsyncStorage

const PagamentoFicticio = ({ route, navigation}) => {
    const { email, password, plano } = route.params;
    const [nomeCartao, setNomeCartao] = useState("");
    const [numeroCartao, setNumeroCartao] = useState("");
    const [dataValidade, setDataValidade] = useState("");
    const [cvv, setCvv] = useState("");
    const [formaPagamento, setFormaPagamento] = useState("Cartão de Crédito");
    const [chavePix, setChavePix] = useState("");

    useEffect(() => {
        if (formaPagamento === "Pix") {
            gerarChavePixAleatoria();
        }
    }, [formaPagamento]);

    const handleSubmit = async () => {
        // Aqui você pode adicionar a lógica para processar o pagamento
        console.log("Dados do formulário de pagamento:", { nomeCartao, numeroCartao, dataValidade, cvv, formaPagamento, chavePix });

        // Salvando o plano selecionado pelo usuário no AsyncStorage
        try {
            await AsyncStorage.setItem('selectedPlan', plano);
            console.log('Plano selecionado salvo com sucesso.');
        } catch (error) {
            console.error('Erro ao salvar plano selecionado:', error);
        }

        // Navegar de volta para a tela de Login
        navigation.navigate('Login');
    };

    const gerarChavePixAleatoria = () => {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let chave = "";
        for (let i = 0; i < 20; i++) {
            chave += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setChavePix(chave);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Página de Pagamento Fictício</Text>
            <Text style={styles.infoText}>Email: {email}</Text>
            <Text style={styles.infoText}>Plano: {plano}</Text>
            <Text style={styles.infoText}>Valor: {getValorPlano(plano)}</Text>
            <Text style={styles.sectionTitle}>Forma de Pagamento</Text>
            <Picker
                selectedValue={formaPagamento}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => setFormaPagamento(itemValue)}
            >
                <Picker.Item label="Cartão de Crédito" value="Cartão de Crédito" />
                <Picker.Item label="Boleto Bancário" value="Boleto Bancário" />
                <Picker.Item label="Pix" value="Pix" />
            </Picker>
            {formaPagamento === "Pix" ? (
                <View style={styles.pixContainer}>
                    <Text style={styles.pixLabel}>Chave Pix:</Text>
                    <Text style={styles.pixValue}>{chavePix}</Text>
                </View>
            ) : null}
            {formaPagamento === "Boleto Bancário" && (
                <View style={styles.boletoContainer}>
                    <Text style={styles.boletoText}>O boleto será enviado para o seu email cadastrado.</Text>
                </View>
            )}
            {formaPagamento !== "Pix" && formaPagamento !== "Boleto Bancário" && (
                <View>
                    <Text style={styles.sectionTitle}>Informações do Cartão</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome no Cartão"
                        onChangeText={(text) => setNomeCartao(text)}
                        value={nomeCartao}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Número do Cartão"
                        onChangeText={(text) => setNumeroCartao(text)}
                        value={numeroCartao}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Data de Validade (MM/AA)"
                        onChangeText={(text) => setDataValidade(text)}
                        value={dataValidade}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="CVV"
                        onChangeText={(text) => setCvv(text)}
                        value={cvv}
                        keyboardType="numeric"
                    />
                </View>
            )}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText} onPress={() => navigation.navigate('Login')}>Pagar</Text>
            </TouchableOpacity>
        </View>
    );
};

const getValorPlano = (plano) => {
    switch (plano) {
        case "Básico":
            return "R$ 19,99/mês";
        case "Padrão":
            return "R$ 29,99/mês";
        case "Premium":
            return "R$ 39,99/mês";
        default:
            return "Valor indisponível";
    }
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
    infoText: {
        fontSize: 16,
        marginBottom: 10,
        color: "#fff",
    },
    sectionTitle: {
        fontSize: 20,
        marginBottom: 10,
        marginTop: 20,
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
    picker: {   
        width: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: "#fff",
        color: "#000",
    },
    pixContainer: {
        marginTop: 10,
        marginBottom: 20,
        alignItems: "center",
    },
    pixLabel: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    pixValue: {
        color: "#fff",
        fontSize: 16,
        marginTop: 5,
    },
    boletoContainer: {
        alignItems: "center",
        marginTop: 20,
    },
    boletoText: {
        color: "#fff",
        fontSize: 16,
    },
});

export default PagamentoFicticio;