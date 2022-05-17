import React, { useCallback, useState } from 'react'
import { useEffect } from 'react'
import { collection, doc, getDoc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore'
import { auth, db, storage } from "../database/firebase";
import { useFocusEffect } from '@react-navigation/native'
import { getDownloadURL, ref } from 'firebase/storage'
import Spinner from "react-native-loading-spinner-overlay/lib";
import { ScrollView } from 'react-native-gesture-handler'
import { Image, TouchableOpacity, View } from 'react-native'
import Heading from '../components/atoms/Heading/Heading.component'
import Paragraph from '../components/atoms/Paragraph/Paragraph.component';
import { format } from 'fecha'
import { splitUserFromEmail } from '../../utils/utils'
import { useSelector } from 'react-redux'


const NiceListScreen = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>([]);
    const [votes, setVotes] = useState<any>([]);
    const userData:any = useSelector<any>(store => store.auth);

    useEffect(() => {
        const actualVotes = Object.values(votes);
    },[votes])

    useFocusEffect(
        useCallback(() => {
            getDocuments();
    }, []))

    const getDocuments = async () => {
        setLoading(true);
        setData([]);
            try {
                const querySnapshot = await getDocs(query(collection(db, "images"), where("type", "==", "nice"),orderBy('creationDate')));
                querySnapshot.forEach(async (doc) => {
                    const res:any = {...doc.data(), id:doc.id};
                    const imageUrl = await getDownloadURL(ref(storage, res.image));
                    // setVotes(arr => [...arr, {[doc.id]:res.votes}]);
                    const voted = res.votes.some((vote: any) => vote === userData.user.email);
                    setData((arr: any) => [...arr, {...res, id:doc.id, imageUrl: imageUrl, voted}]);
                });
            } catch (error) {
                console.log(error)                    
            }finally{
                setLoading(false);
            }
    }

    const handleVote = async (id: string) => {
        setLoading(true);
        try {
            const ref = doc(db, "images", id);
            const document = await getDoc(ref);
            const documentVotes = document.data()?.votes;
            const userVoted = documentVotes.find((email: any) => email === userData.user.email);
            let newVotes;
            if(userVoted){
                newVotes = documentVotes.filter((email: any) => email !== userData.user.email);
            }else{
                newVotes = [...documentVotes, userData.user.email];
            }
            await updateDoc(ref, {votes:newVotes})
            await getDocuments();
        } catch (error) {
            console.log(error)
        } finally{
            setLoading(false);        }
    }

    return (
        <ScrollView>            
            {loading && <Spinner />}
            {data.map((item: { imageUrl: any; user: string; votes: string | any[]; creationDate: { toDate: () => Date; }; voted: any; id: string; }) => (
                <View style={{backgroundColor:'white',elevation:20,height:400, width:'90%', margin:10, borderBottomEndRadius:20, borderBottomStartRadius:20}}>
                    <Image resizeMode='cover' style={{flex:1}} source={{uri:item.imageUrl}} />
                    <View style={{padding:10, justifyContent:'space-between', height:150 }}>
                        <View>
                            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                <Heading>{splitUserFromEmail(item.user)}</Heading>
                                <Heading>{item.votes.length} votos</Heading>
                            </View>
                            <Paragraph textAlign='left'>{format(item.creationDate.toDate(), 'DD/MM/YYYY HH:mm')}hs</Paragraph>
                        </View>
                        {item.voted ? 
                            <TouchableOpacity onPress={()=>handleVote(item.id)} >Eliminar voto</TouchableOpacity>:
                            <TouchableOpacity onPress={()=>handleVote(item.id)}>Votar</TouchableOpacity>
                        }
                    </View>
                </View>
            ))}            
        </ScrollView>
    )
}

export default NiceListScreen