import { View, Text, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, where, query } from 'firebase/firestore';
import useAuth from '../hooks/useAuth';
import { db } from '../firebase';



const MatchList = () => {
    const [matches, setMatches] = useState([]);
    const { user } = useAuth();

    useEffect(
        () =>
        onSnapshot(
            query(
                collection(db, 'matches'),
                where('usersMatched', 'array-contains', user.uid)
            ),

            (snapshot) =>
            setMatches(
                snapshot.docs.map((doc) =>({
                    id: doc.id,
                    ...doc.data(),
                }))
            )
        ),
        [user]
    );

    return (
        <SafeAreaView style={{ flex: 1}}>

        </SafeAreaView>

       
    )

}

/*
<Text style={styles.text1}>
    {matchedUserInfo?.displayName}
</Text>
const navigation = useNavigation();
    const { user } = useAuth();
    const [matchedUserInfo, setMatchedUserInfo] = useState(null);
    const [lastMessage, setLastMessage] = useState("");

    useEffect(() => {
        setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid))
     }, [matchDetails, user]);



*/

export default MatchList