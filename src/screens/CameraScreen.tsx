import React, { useEffect, useState } from 'react';

import { View, Image, Text, TouchableOpacity, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, auth } from "../database/firebase";
import Spinner from "react-native-loading-spinner-overlay/lib";
import styles from "../styles/Style";
import { addDoc, collection } from "firebase/firestore";
import { Camera } from "expo-camera";
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';


const CameraScreen = () => {
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");

  const [imageType, setImageType] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()


  const storage = getStorage();
  
    useEffect(() => {
      (async () => {
        await Camera.requestCameraPermissionsAsync();
      })();
    }, []);

  const getBlob = async (image: any) => {
    return await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    })
  };

  const dateComponentPad = (value: string) => {
    var format = value;
    return format.length < 2 ? '0' + format : format;
  }

  const formatDate = (date: any) => {
    let datePart = [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(dateComponentPad);
    let timePart = [date.getHours(), date.getMinutes(), date.getSeconds()].map(dateComponentPad);
    return datePart.join('-') + ' ' + timePart.join(':');
  }

  const uploadImage = async (image: any, type: string) => {
    setLoading(true);
    const blob: any = await getBlob(image);
    const fileName = image.substring(image.lastIndexOf("/") + 1);
    const fileRef = ref(storage, "images/" + fileName);
    await uploadBytes(fileRef, blob);
    await addDoc(collection(db, "images"), {
      user: auth?.currentUser?.email,
      displayName: auth?.currentUser?.displayName,
      date: formatDate(new Date()),
      votes: [],
      type: type,
      creationDate: new Date(),
      image: fileRef.fullPath,
    });
    setMessageError("Imagen subida correctamente", false);
    await blob.close();
  };

  const setMessageError = (message: string, error: boolean) => {
    setMessage(message);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }

  const handleCamera = async (type: string) => {
    setImageType(tp => type);
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setLoading(true);
      await uploadImage(result["uri"], type).then(() => {type === "nice" ? navigation.replace('Like') : navigation.replace('Dislike');}).finally(() => { setLoading(false) });      
      ;
    }
  };

  const handlerBack = () => {
    navigation.replace('Home');
}

  return (
    <ImageBackground source={require('../assets/background.jpg')} resizeMode="repeat" style={styles.image}>
          {loading && <View style={styles.spinContainer}>
                    <Spinner
                        visible={loading}
                        textStyle={styles.spinnerTextStyle}
                        />
                </View>}
      <View style={styles.container}>
        <View>
          <Text style={styles.textHomeCamera}>
            Seleccione la colección para la foto</Text>
        </View>
        <TouchableOpacity
          onPress={() => handleCamera("nice")}
          style={styles.buttonHomeCamera}
        >
          <Image
            source={require('../assets/lente.png')}
            resizeMode="contain"
            style={styles.logoHome}
          />
          <Text style={styles.buttonText}>Cosas Lindas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleCamera("messy")}
          style={[styles.buttonHomeCamera, styles.buttonOutlineCamera]}

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
                        onPress={handlerBack}
                        style={[styles.button, styles.buttonOutline]}
                        >
                        <Text style={styles.buttonOutlineText}>Volver</Text>
                    </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
export default CameraScreen

