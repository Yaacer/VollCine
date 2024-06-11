import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Divider } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import styles from '../Perfil/style';

const ProfileScreen = ({ navigation }) => {

    const [userData, setUserData] = useState(null);

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

        getUserData();
    }, []);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('isLoggedIn');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Erro ao deslogar:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://avatars.githubusercontent.com/u/143120598?v=4' }}
                style={styles.profileImage}
            />
            <Text style={styles.name}>{userData ? userData.name : 'Nome do Usuário'}</Text>
            <Text style={styles.plan}>{userData ? `Plano: ${userData.selectedPlan}` : 'Plano: Premium'}</Text>
            <View style={styles.personalInfo}>
                <Text style={styles.infoLabel}>Email:</Text>
                <Text style={styles.infoValue}>{userData ? userData.email : 'user@example.com'}</Text>
                {/* Adicione mais informações pessoais conforme necessário */}
            </View>
            <>
            <TouchableOpacity  onPress={handleLogout}>
             
                <Text style={styles.logoutButtonText}>Sair</Text>
               
            </TouchableOpacity>
             </>
        </View>
    );
};

export default ProfileScreen; 