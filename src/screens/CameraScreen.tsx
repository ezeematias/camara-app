import React, { useEffect, useState } from 'react';
import { Button, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db } from "../database/firebase";
import Spinner from "react-native-loading-spinner-overlay/lib";
import styles from "../styles/Style";
import { collection, getDocs, getDoc, query, doc, addDoc, deleteDoc, updateDoc } from "firebase/firestore";

export default function CameraScreen() {

  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  const storage = getStorage();

  useEffect(() => {
    const func = async () => {
      setLoading(true);
      const reference = ref(storage, 'images/' + auth.currentUser?.email + ".jpg");
      await getDownloadURL(reference).then(url => {
        setUrl(url);
      }).finally(() => { setLoading(false) });
    }
    func();
  }, []);

  const onPressCamera = async () => {
    let result = await ImagePicker.launchCameraAsync();

    const personsCollection = collection(db, 'persons');

    let name = "Prueba"
    // ALTA
    addDoc(personsCollection, { name });

    if (!result.cancelled) {
      setLoading(true);
      const storageRef = ref(storage, 'images/' + auth.currentUser?.email + ".jpg");
      const img = await fetch(result.uri);
      const blob = await img.blob();
      await uploadBytes(storageRef, blob).finally(() => { setLoading(false) });
    }
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