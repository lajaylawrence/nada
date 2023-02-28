import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity, StyleSheet} from 'react-native'
import { db } from '../firebase'
import useAuth from '../hooks/useAuth'
import getMatchedUserInfo from '../lib/getMatchedUserInfo'

const ChatRow = ({ matchDetails }) => {
    const navigation = useNavigation();
    const { user } = useAuth();
    const [MatchedUserInfo, setMatchedUserInfo] = useState(null);
    const [lastMessage, setLastMessage] = useState("");

    useEffect(() => {
        setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid))
     }, [matchDetails, user]);


     useEffect(() => onSnapshot(query(collection(db,'matches', matchDetails.id, "messages"), orderBy('timestamp, "desc')
     ), snapshot => setLastMessage(snapshot.docs[0]?.data()?.message)
     ),
      [matchDetails,db]
      );



  return (
    <TouchableOpacity  style={styles.touchop1} onPress={() => navigation.navigate('Message', {
        matchDetails
    })}>
        <Image 
           style = {styles.image1}
           source={{uri: matchedUserInfo?.photoURL}}
        />

        <View>
            <Text style={styles.text1}>
                {matchedUserInfo?.displayName}
            </Text>
            <Text>
                {lastMessage || "Hail up the catty fammo"}
            </Text>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    image1 : {
        borderRadius: "9999px",
        marginRight: "1rem",
        width: "4rem",
        height: "4rem",
    },
    touchop1: {
        paddingTop: "0.75rem",
        paddingBottom: "0.75rem",
paddingLeft: "1.25rem",
paddingRight: "1.25rem",
marginTop: "0.25rem",
marginBottom: "0.25rem",
marginLeft: "0.75rem",
marginRight: "0.75rem",
backgroundColor: "#ffffff",
flexDirection: "row",
alignItems: "center",
borderRadius: "0.5rem",
    
shadowColor: "#000",
shadowOffset: { width: 0, height: 1 },
shadowOpacity: 0.2,
shadowRadius: 1.41,
elevation: 2,
},
text1: {
    fontSize: "1.125rem",
lineHeight: "1.75rem",
fontWeight: "600",
}

   
})

export default ChatRow
