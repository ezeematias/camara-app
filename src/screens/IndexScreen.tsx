import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "../styles/Style";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const IndexScreen = () => {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    const handlerSignUp = () => {  
        navigation.replace('SignUp');
    }

    const handlerSingIn = () => {
        navigation.replace('Login');
    }

    return (   
        <View style={styles.container}> 
            <Image 
                source={require('../assets/lente.png')}
                resizeMode="contain"                 
                style={styles.logo} 
            />   

            <View style={styles.buttonContainer} >   
                <TouchableOpacity
                    onPress={handlerSingIn}                   

                    style={styles.button}
                    >
                    <Text style={styles.buttonText}>Iniciar Sesión</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                    onPress={handlerSignUp}
                    style={[styles.button, styles.buttonOutline]}
                    >
                    <Text style={styles.buttonOutlineText}>Registrarse</Text>
                </TouchableOpacity>
            </View>              
        </View> 
         
    );
}
        
export default IndexScreen
