import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import React from 'react';
import { Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
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

    const handlerCamera = (type: string) => {
        type === "like" ? navigation.replace('Like') : navigation.replace('Dislike');
    }

    return (
        <ImageBackground source={require('../assets/background.jpg')} resizeMode="repeat" style={styles.image}>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => handlerCamera("like")}
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
                    onPress={() => handlerCamera("dislike")}
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
        </ImageBackground>
    );
}

export default HomeScreen;
