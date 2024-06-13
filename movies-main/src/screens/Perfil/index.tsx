import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, ScrollView, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { ArrowSquareOut, CaretRight } from 'phosphor-react-native';
import { Logo } from '../../components/Logo';
import styles from '../Perfil/style';
import DefaultProfileImage from '../../assets/perfil.png';
import Toast from 'react-native-toast-message';

const ProfileScreen = ({ navigation }) => {
    const [userData, setUserData] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState("Premium");
    const [modalVisible, setModalVisible] = useState(false);
    const [helpModalVisible, setHelpModalVisible] = useState(false);
    const [contactSubject, setContactSubject] = useState('');
    const [contactMessage, setContactMessage] = useState('');

    useEffect(() => {
        const getUserData = async () => {
            try {
                const data = await AsyncStorage.getItem('userData');
                if (data) {
                    setUserData(JSON.parse(data));
                }
            } catch (error) {
                console.error('Erro ao obter dados do usuário:', error);
            }
        };

        const getSelectedPlan = async () => {
            try {
                const plan = await AsyncStorage.getItem('selectedPlan');
                if (plan) {
                    setSelectedPlan(plan);
                }
            } catch (error) {
                console.error('Erro ao obter plano selecionado:', error);
            }
        };

        getUserData();
        getSelectedPlan();
    }, []);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('isLoggedIn');
            await navigation.navigate('Login');
        } catch (error) {
            console.error('Erro ao deslogar:', error);
        }
    };

    const handlePrivacyPress = () => {
        setModalVisible(true);
    };

    const handleHelpPress = () => {
        setHelpModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const closeHelpModal = () => {
        setHelpModalVisible(false);
    };

    const handleContactSubmit = () => {
        if (!contactSubject || !contactMessage) {
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: 'Nenhuma mensagem foi enviada',
                style: { zIndex: 1000 }, // Garante que o Toast tenha um zIndex alto
            });
        } else {
            console.log('Assunto:', contactSubject);
            console.log('Mensagem de contato enviada:', contactMessage);
            setContactSubject('');
            setContactMessage('');
            setHelpModalVisible(false);
            Toast.show({
                type: 'success',
                text1: 'Mensagem enviada com sucesso',
                text2: 'Aguarde enquanto nossa equipe analisa sua solicitação.',
            });
        }
    };

    return (
        <View style={styles.container}>
            <Logo style={absoluteLogoStyles.logoContainer} />
            <Image
                source={userData && userData.profileImage ? { uri: userData.profileImage } : DefaultProfileImage}
                style={styles.profileImage}
            />
            <Text style={styles.name}>{userData ? userData.nome : 'Nome do Usuário'}</Text>
            <Text style={styles.plan}>Plano: {selectedPlan}</Text>
            <View style={styles.personalInfo}>
                <Text style={styles.infoLabel}>Email:</Text>
                <Text style={styles.infoValue}>{userData ? userData.email : 'user@example.com'}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleHelpPress}>
                <View style={styles.buttonContent}>
                    <Text style={styles.buttonText}>Ajuda</Text>
                    <ArrowSquareOut size={25} weight="light" color="#FFF" />
                </View>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity style={styles.button} onPress={handlePrivacyPress}>
                <View style={styles.buttonContent}>
                    <Text style={styles.buttonText}>Privacidade e Segurança</Text>
                    <CaretRight size={25} weight="light" color="#FFF" />
                </View>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <ScrollView>
                            <Text style={styles.modalTitle}>Termos de Privacidade e Segurança</Text>
                            <Text style={styles.modalText}>
                                Bem-vindo ao VollCine. Nós levamos sua privacidade e segurança a sério. Aqui estão os termos de privacidade e segurança do nosso aplicativo de filmes:
                            </Text>
                            <Text style={styles.modalText}>
                                <Text style={{ fontWeight: 'bold' }}>1. Coleta de Informações:</Text> Coletamos informações pessoais como nome, email, e histórico de visualizações para melhorar a sua experiência no VollCine. Garantimos que esses dados são armazenados com segurança e não são compartilhados com terceiros sem sua permissão.
                            </Text>
                            <Text style={styles.modalText}>
                                <Text style={{ fontWeight: 'bold' }}>2. Uso das Informações:</Text> Utilizamos suas informações para personalizar o conteúdo, fornecer recomendações e melhorar nossos serviços. Podemos também usar seus dados para comunicar novidades, ofertas e atualizações relacionadas ao VollCine.
                            </Text>
                            <Text style={styles.modalText}>
                                <Text style={{ fontWeight: 'bold' }}>3. Segurança dos Dados:</Text> Implementamos medidas de segurança para proteger suas informações contra acessos não autorizados, alterações, divulgações ou destruição. Utilizamos tecnologia de criptografia e protocolos de segurança avançados.
                            </Text>
                            <Text style={styles.modalText}>
                                <Text style={{ fontWeight: 'bold' }}>4. Direitos do Usuário:</Text> Você tem o direito de acessar, corrigir ou excluir suas informações pessoais armazenadas em nosso sistema. Para exercer esses direitos, entre em contato com nosso suporte.
                            </Text>
                            <Text style={styles.modalText}>
                                <Text style={{ fontWeight: 'bold' }}>5. Cookies:</Text> Utilizamos cookies para aprimorar sua experiência de navegação. Você pode configurar seu navegador para recusar cookies, mas isso pode afetar algumas funcionalidades do VollCine.
                            </Text>
                            <Text style={styles.modalText}>
                                <Text style={{ fontWeight: 'bold' }}>6. Alterações na Política:</Text> Podemos atualizar nossa política de privacidade periodicamente. Recomendamos que você revise esta página regularmente para se manter informado sobre como protegemos suas informações.
                            </Text>
                            <Text style={styles.modalText}>
                                <Text style={{ fontWeight: 'bold' }}>7. Contato:</Text> Se você tiver dúvidas ou preocupações sobre nossa política de privacidade e segurança, entre em contato com nosso suporte ao cliente através do email suporte@vollcine.com.
                            </Text>
                            <Text style={styles.modalText}>
                                Agradecemos por escolher o VollCine. Nosso compromisso é proporcionar a melhor experiência de entretenimento com a máxima segurança e respeito à sua privacidade.
                            </Text>
                        </ScrollView>
                        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                            <Text style={styles.closeButtonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={helpModalVisible}
                onRequestClose={closeHelpModal}
            >
                <View style={styles.modalContainer}>
                    <View style={[styles.modalContent, helpModalStyles.helpModalContent]}>
                        <Text style={styles.modalTitle}>Como podemos ajudar?</Text>
                        <TextInput
                            style={[helpModalStyles.textInput, helpModalStyles.subjectInput]}
                            placeholder="Assunto"
                            placeholderTextColor="#999"
                            value={contactSubject}
                            onChangeText={setContactSubject}
                        />
                        <TextInput
                            style={[helpModalStyles.textInput, helpModalStyles.messageInput]}
                            placeholder="Escreva suas dúvidas ou reclamações aqui..."
                            placeholderTextColor="#999"
                            value={contactMessage}
                            onChangeText={setContactMessage}
                            multiline
                        />
                        <TouchableOpacity style={helpModalStyles.submitButton} onPress={handleContactSubmit}>
                            <Text style={helpModalStyles.submitButtonText}>Enviar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.closeButton} onPress={closeHelpModal}>
                            <Text style={styles.closeButtonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const absoluteLogoStyles = StyleSheet.create({
    logoContainer: {
        position: 'absolute',
        top: 10,
        left: 5,
    },
});

const helpModalStyles = StyleSheet.create({
    helpModalContent: {
        width: '90%',
        height: '80%', 
        alignSelf: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    textInput: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        color: '#000',
        marginVertical: 10,
    },
    subjectInput: {
        height: 50,
    },
    messageInput: {
        height: 100,
    },
    submitButton: {
        backgroundColor: '#242A32',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    submitButtonText: {
        color: '#FFF',
        fontSize: 16,
    },
});

export default ProfileScreen;
