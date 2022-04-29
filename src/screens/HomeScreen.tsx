import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { RootStackParamList } from '../../App';
import { auth } from "../database/firebase";
import styles from '../styles/Style';

const HomeScreen = () => {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    async function handlerSingOut() {
        await auth
            .signOut()
            .then(() => { navigation.replace('Index') })
            .catch((error: any) => alert(error.message))
    }

    return (
        <View style={styles.containerHome}>
            <View style={styles.buttonContainerHome} >
                <TouchableOpacity
                    onPress={handlerSingOut}
                    style={styles.buttonHome}
                >
                    <Image
                        source={require('../assets/lente.png')}
                        resizeMode="contain"
                        style={styles.logoHome}
                    />
                    <Text style={styles.buttonText}>Cosas Lindas</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handlerSingOut}
                    style={[styles.buttonHome, styles.buttonOutlineRole]}
                >
                    <Image
                        source={require('../assets/lenteRojo.png')}
                        resizeMode="contain"
                        style={styles.logoHome}
                    />
                    <View>
                        <Text style={styles.buttonOutlineTextRole}>
                            Cosas Feas
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handlerSingOut}
                    style={[styles.button, styles.buttonOutline]}>
                    <View>
                        <Text style={styles.buttonOutlineText}>

                            Cerrar Sesión</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default HomeScreen;
