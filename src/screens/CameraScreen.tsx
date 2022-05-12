import React, { useEffect, useState } from 'react';
import { Button, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db } from "../database/firebase";
import Spinner from "react-native-loading-spinner-overlay/lib";
import styles from "../styles/Style";
import { doc, setDoc } from "firebase/firestore";

export default function CameraScreen() {

  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [urlImg, setUrlImg] = useState("");

  const storage = getStorage();
  
  const func = async () => {
    setLoading(true);
    const reference = ref(storage, "images/");
    await getDownloadURL(reference).then(url => {
      setUrl(url);
    }).finally(() => { setLoading(false) });
  }

  const dateComponentPad = (value: string) => {
    var format = value;
    return format.length < 2 ? '0' + format : format;
  }

  const formatDate = (date: any) => {
    let datePart = [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(dateComponentPad);
    let timePart = [date.getHours(), date.getMinutes(), date.getSeconds()].map(dateComponentPad);
    return datePart.join('-') + ' ' + timePart.join(':');
  }

  const onPressCamera = async () => {
    
    let result = await ImagePicker.launchCameraAsync();
    let docData: any = {};

    if (!result.cancelled) {
      setLoading(true);
      const storageRef = ref(storage, 'images/' + auth.currentUser?.email + " " + formatDate(new Date()) + ".jpg");
      const img = await fetch(result.uri);
      setUrlImg(result.uri);
      const blob = await img.blob();
      await uploadBytes(storageRef, blob).finally(() => { setLoading(false); func(); });
      docData = {
        email: auth.currentUser?.email,
        uid: auth.currentUser?.uid,
        name: auth.currentUser?.displayName,
        image: result.uri,
        url: url,
        likes: 0,
        date: formatDate(new Date()),
      };
    }

    await setDoc(doc(db, "gallery", auth.currentUser!.email! + " " + formatDate(new Date())), docData);
  }

  return (

    <View style={styles.container}>
      {loading && <View style={styles.spinContainer}>
        <Spinner
          visible={loading}
          textStyle={styles.spinnerTextStyle}
        />
      </View>}
      <Image style={{ width: '70%', height: '70%' }}
        source={{ uri: url }} />
      <Button title="Camera" onPress={onPressCamera} />

    </View>
  );
}