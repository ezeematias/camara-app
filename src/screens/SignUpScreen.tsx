import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { auth } from "../database/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Spinner from "react-native-loading-spinner-overlay/lib";
import styles from "../styles/Style";

const SignScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.replace('Home');
            }
        })
        return unsubscribe;
    }, []);

    const handlerSingUp = async () => {
        if (displayName === "" || email === "" || password === "" || rePassword === "") {
            setMessageError("Todos los campos son obligatorios");
        } else if (password === rePassword) {
            setLoading(true);
            await createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential: { user: any; }) => {
                    userCredential.user
                })
                .catch(error => {
                    switch (error.code) {
                        case 'auth/invalid-email':
                            setMessageError("Correo inválido");
                            break;
                        case 'auth/email-already-in-use':
                            setMessageError("Correo ya registrado");
                            break;
                        case 'auth/missing-email':
                            setMessageError("Correo no ingresado");
                            break;
                        case 'auth/internal-error':
                            setMessageError("Ingrese contraseña");
                            break;
                        default:
                            setMessageError(error.message)
                            break;
                    }
                }).finally(() => { setLoading(false) });
        } else {
            setMessageError("Las contraseñas no coinciden");
        }
    }

    const handlerBack = () => {
        navigation.replace('Index');
    }

    const setMessageError = (message: string) => {
        setMessage(message);
        setTimeout(() => {
            setMessage("");
        }, 3000); 
    }

    return (
        <View style={styles.container}>
            {loading && <View style={styles.spinContainer}>
                    <Spinner
                        visible={loading}  
                        textStyle={styles.spinnerTextStyle}
                    />
                </View>}
            <Image
                source={require('../assets/lente.png')}
                resizeMode="contain"
                style={styles.logo}
            />

            <View style={styles.inputContainer}>
                {!!message ? <TouchableOpacity
                    style={styles.buttonError}
                    onPress={() => setMessage("")}
                >
                    <Text style={styles.buttonText}>{message}</Text>
                </TouchableOpacity> : null}

                <TextInput placeholder="Nombre"
                    value={displayName}
                    onChangeText={text => setDisplayName(text)}
                    style={styles.input}
                />
                <TextInput placeholder="Correo electrónico"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />

                <TextInput placeholder="Contraseña"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
                <TextInput placeholder="Vuelva a escribir la contraseña"
                    value={rePassword}
                    onChangeText={text => setRePassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            <View style={styles.buttonContainer} >
                <TouchableOpacity
                    onPress={handlerSingUp}
                    style={[styles.button]}
                >
                    <Text style={styles.buttonText}>Crear</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handlerBack}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Volver</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
}

export default SignScreen