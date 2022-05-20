import React, { useCallback, useLayoutEffect, useState } from 'react'
import { useEffect } from 'react'
import { collection, addDoc, doc, getDoc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore'
import { db, auth } from "../database/firebase";
import { useFocusEffect } from '@react-navigation/native'
import { getDownloadURL, ref,getStorage,uploadBytes  } from 'firebase/storage'
import Spinner from "react-native-loading-spinner-overlay/lib";
import { ScrollView } from 'react-native-gesture-handler'
import { Image, View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import { format } from 'fecha'
import styles from "../styles/Style";
import { Camera } from "expo-camera";
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const NiceListScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [data, setData] = useState<any>([]);
  const [votes, setVotes] = useState<any>([]);

  const [fetched, setFetched] = React.useState(false);

  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");

  const [imageType, setImageType] = useState("");
  const [loading, setLoading] = useState(false);


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

  const handleCamera = async () => {
    setImageType(tp => "nice");
    setLoading(true);
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 0.3,
    });
    if (!result.cancelled) {
      await uploadImage(result["uri"], "nice").then(() => {navigation.replace('Like')}).finally(() => { setLoading(false) });      
      ;
    }
    setLoading(false)
  };

  useEffect(() => {
    const actualVotes = Object.values(votes);
  }, [votes])

  useEffect(() => {
    const ac = new AbortController();
    Promise.all([
      fetch('http://placekitten.com/1000/1000', { signal: ac.signal }),
      fetch('http://placekitten.com/2000/2000', { signal: ac.signal })
    ]).then(() => setFetched(true))
      .catch(ex => console.error(ex));
    return () => ac.abort(); // Abort both fetches on unmount
  }, []);

  async function handlerSingOut() {
    await auth
      .signOut()
      .then(() => { navigation.replace('Index') })
      .catch((error: any) => alert(error.message))
  }
  function handlerBack() {
    navigation.replace('Home');
  }

  useFocusEffect(
    useCallback(() => {
      getDocuments();
    }, []))

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.buttonAccessCamera}>
          <TouchableOpacity style={styles.buttonCamera} onPress={handleCamera}>
            <FontAwesome name="camera" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handlerSingOut}>
            <FontAwesome name="power-off" size={24} color="#fff" />
          </TouchableOpacity>

        </View>
      ),
      headerLeft: () => (

        <View style={styles.buttonAccessCamera}>
          <TouchableOpacity onPress={handlerBack}>
            <FontAwesome name="step-backward" size={24} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonCamera} onPress={handlerBack}>
            <Image
              source={require('../assets/lente.png')}
              resizeMode="contain"
              style={styles.logoLike}
            />
          </TouchableOpacity>

        </View>
      ),
      headerTitle: () => (
        <Text style={styles.textUser}>{auth?.currentUser?.displayName}</Text>
      ),
      headerTintColor: "#fff",
      headerTitleAlign: 'center',
      headerBackButtonMenuEnabled: false,
      headerStyle: {
        backgroundColor: '#232e5c',
      }
    });
  }, []);

  const getDocuments = async () => {
    setLoading(true);
    setData([]);
    try {
      const querySnapshot = await (await getDocs(query(collection(db, "images"), orderBy('date', 'desc'), orderBy('creationDate', 'desc'))));       
      
      querySnapshot.forEach(async (doc) => {
        if (doc.data().type === 'nice') {
          const res: any = { ...doc.data(), id: doc.id };
          const imageUrl = await getDownloadURL(ref(storage, res.image));
          const voted = res.votes.some((vote: any) => vote === auth?.currentUser?.email);
          let countLike = doc.data().votes.length;
          setData((arr: any) => [...arr, { ...res, id: doc.id, imageUrl: imageUrl, voted, countLike }].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0)));
        }
      });
      /*
      const unsubscribe = onSnapshot(query(collection(db, "images"), orderBy("creationDate", "desc")), (snapshot =>
        setData(snapshot.docs.map(doc => ({         
              
              imageUrl: getDownloadURL(ref(storage, doc.data().image)),
              voted:  doc.data().votes.some((vote: any) => vote === auth?.currentUser?.email),
              countLike: doc.data().votes.length,
              date: doc.data().date,
          })))
      ))
      return unsubscribe;*/
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  const handleVote = async (id: string) => {
    try {
      const ref = doc(db, "images", id);
      const document = await getDoc(ref);
      const documentVotes = document.data()?.votes;
      const userVoted = documentVotes.find((email: any) => email === auth?.currentUser?.email);
      let newVotes;
      let countVote = document.data()?.votes.length;
      if (userVoted) {
        newVotes = documentVotes.filter((email: any) => email !== auth?.currentUser?.email);
        countVote--;
      } else {
        newVotes = [...documentVotes, auth?.currentUser?.email];
        countVote++;
      }
      setData((arr: any) => arr.map((item: any) => item.id === id ? { ...item, voted: !item.voted } : item));
      setData((arr: any) => arr.map((item: any) => item.id === id ? { ...item, countLike: countVote } : item));
      await updateDoc(ref, { votes: newVotes })
      //await getDocuments();      
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  return (

    <ImageBackground source={require('../assets/background.jpg')} resizeMode="repeat" style={styles.image}>
      {loading && <View style={styles.spinContainer}>
        <Spinner
          visible={loading}
          textStyle={styles.spinnerTextStyle}
        />
      </View>}
      <ScrollView>

        {data.map((item: { imageUrl: any; countLike: any; displayName: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; creationDate: { toDate: () => Date; }; votes: string | any[]; voted: any; id: string; }) => (
          <View style={{ backgroundColor: '#232e5c', height: 300, width: '95%', margin: 10 }}>
            <Image resizeMode='cover' style={{ flex: 1 }} source={{ uri: item.imageUrl }} />
            <View style={{ padding: 10, justifyContent: 'space-between', height: 100 }}>
              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.textUser}>{item.displayName}</Text>
                  {item.voted ?
                    <TouchableOpacity onPress={() => handleVote(item.id)}>
                      <AntDesign name={'heart'} size={30} color="red" /></TouchableOpacity> :
                    <TouchableOpacity onPress={() => handleVote(item.id)}>
                      <AntDesign name={'hearto'} size={30} color="red" /></TouchableOpacity>
                  }
                </View>
                <Text style={styles.textCard}>{item.countLike} Me gustas</Text>
                <Text style={styles.textCard}>{format(item.creationDate.toDate(), 'DD/MM/YYYY HH:mm')}hs</Text>
              </View>
            </View>
          </View>
        ))}




      </ScrollView>
    </ImageBackground>
  )
}

export default NiceListScreen