import React, { useCallback, useState } from 'react'
import { useEffect } from 'react'
import { collection, doc, getDoc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore'
import { db, storage } from '../../../InitApp'
import { useFocusEffect } from '@react-navigation/native'
import { getDownloadURL, ref } from 'firebase/storage'
import Spinner from '../../atoms/Spinner/Spinner.component'
import { ScrollView } from 'react-native-gesture-handler'
import { Card } from 'react-native-paper'
import { Image, View } from 'react-native'
import Heading from '../../atoms/Heading/Heading.component'
import Paragraph from '../../atoms/Paragraph/Paragraph.component';
import { format } from 'fecha'
import { splitUserFromEmail } from '../../../utils/utils'
import AwesomeButton from '../../atoms/AwesomeButton/Button.component'
import { useSelector } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'

const MessyListScreen = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any>([]);
    const [votes, setVotes] = useState<any>([]);
    const userData:any = useSelector<any>(store => store.auth);

    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            setData([]);
            (async () => {
                try {
                    const querySnapshot = await getDocs(query(collection(db, "images"), orderBy('creationDate'), where("type", "==", "messy")));
                    querySnapshot.forEach(async (doc) => {
                        const res:any = {...doc.data(), id:doc.id};
                        const imageUrl = await getDownloadURL(ref(storage, res.image));
                        setVotes(arr => [...arr, res.votes]);
                        setData(arr => [...arr, {...res, id:doc.id, imageUrl: imageUrl}]);
                    });
                } catch (error) {
                    console.log(error)                    
                }finally{
                    setLoading(false);
                }
            })();
    }, []))

    const handleVote = async (id) => {
        setLoading(true);
        try {
            const ref = doc(db, "images", id);
            const document = await getDoc(ref);
            const documentVotes = document.data()?.votes;
            const userVoted = documentVotes.find(email => email === userData.user.email);
            let newVotes;
            if(userVoted){
                newVotes = documentVotes.filter(email => email !== userData.user.email);
            }else{
                newVotes = [...documentVotes, userData.user.email];
            }
            setVotes(newVotes);
            await updateDoc(ref, {votes:newVotes})
        } catch (error) {
            console.log(error)
        } finally{
            setLoading(false);
        }
    }

    const isVoted = (user) => {
        console.log(user)
        return votes.some(vote => vote === user);
    }

    return (
        <ScrollView>
            <LinearGradient style={{alignItems:'center', height:'100%', width:'100%'}} colors={["#a8c0ff", "#3f2b96"]}>
            {loading && <Spinner />}
            {data.map((item) => (
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
                        {isVoted(item.user) ? 
                            <AwesomeButton backgroundDarker="#b40000" rounded height={50} onPress={()=>handleVote(item.id)} backgroundColor="#f41d1d">Eliminar voto</AwesomeButton>:
                            <AwesomeButton rounded height={50} onPress={()=>handleVote(item.id)}>Votar</AwesomeButton>
                        }
                    </View>
                </View>
            ))}
            </LinearGradient>
        </ScrollView>
    )
}

export default MessyListScreen