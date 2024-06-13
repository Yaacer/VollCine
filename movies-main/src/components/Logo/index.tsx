import React from 'react';
import { Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logo from '../../assets/VollCine.png';

export function Logo({ style }) {
    const navigation = useNavigation();

    const handleLogoPress = () => {
        navigation.navigate('MainHome');
    };

    return (
        <View style={[styles.logoContainer, style]}>
            <TouchableOpacity onPress={handleLogoPress}>
                <Image
                    source={logo}
                    style={styles.logo}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    logoContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
});
