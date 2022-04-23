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
            .then(() => {navigation.replace('Index')})
            .catch((error: any) => alert(error.message))
    }    

  return (
    <View style={styles.container}>         
        
        <Text style={styles.textHome}>¡Bienvenido!</Text>
        <Text style={styles.textDescription}>Estamos trabajando en un mejor diseño. Muchas gracias por iniciar sesión.</Text>
     
        <View style={styles.buttonContainer} >   
                <TouchableOpacity 
                    onPress={handlerSingOut}
                    style={styles.button}
                >
                <Text style={styles.buttonText}>Cerrar Sesión</Text>
                </TouchableOpacity>
            </View>                       
            <Image 
                source={require('../assets/lente.png')}
                resizeMode="contain"                 
                style={styles.logoHome} 
            />    
        
    </View>
  );
}

export default HomeScreen;
