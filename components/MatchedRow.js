import { useNavigation } from '@react-navigation/native'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity, StyleSheet, Image, View, Text} from 'react-native'
import { db } from '../firebase'
import useAuth from '../hooks/useAuth'
import getMatchedUserInfo from '../lib/getMatchedUserInfo'

const MatchedRow = ({ matchDetails }) => {
    const navigation = useNavigation();
    const { user } = useAuth();
    const [matchedUserInfo, setMatchedUserInfo] = useState(null);
    var [lastMessage, setLastMessage] = useState("");

    useEffect(() => {
        setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid))
     }, [matchDetails, user]);


     useEffect(() => onSnapshot(query(collection(db, 'matches', matchDetails.id, 'messages'), orderBy('timestamp', 'desc')
     ), snapshot => setLastMessage(snapshot.docs[0]?.data()?.message)
     ),
      [matchDetails,db]
      );

      if (lastMessage?.length > 15){
        lastMessage = lastMessage.slice(0,30) + "..."
      }

     

  return (
    <TouchableOpacity  style={styles.touchop1} onPress={() => navigation.navigate('Chat', {
        matchDetails
    })}>
        <Image 
           style = {styles.image1}
           source={{uri: matchedUserInfo?.profilePic}}
        />

        <View >
            <Text style={styles.text1}>
                {matchedUserInfo?.displayName}
            </Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', position:'relative'}} >
            </View>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    image1 : {
        borderRadius: 12,
        marginRight: 14,
        marginLeft: 3,
        marginBottom: 3,
        marginTop: 3,
        width: 65,
        height: 65,
        
    },
    touchop1: {
        paddingTop: 5,
        paddingBottom: 5,
paddingLeft: 5,
paddingRight: 5,
marginTop: 3,
marginBottom: 6,
marginLeft: 10,
marginRight: 10,
backgroundColor: "#ffffff",
flexDirection: "column",
alignItems: "center",
borderRadius: 5,
minWidth: 50,
//maxWidth: '40%',
        
    
shadowColor: "#000",
shadowOffset: { width: 0, height: 1 },
shadowOpacity: 0.2,
shadowRadius: 1.41,
elevation: 2,
},
text1: {
    fontSize: 14,
// lineHeight: 1,
fontWeight: "600",
},
text2: {
    flexWrap: "wrap",
    paddingRight: 5,
    
}

   
})

export default MatchedRow
