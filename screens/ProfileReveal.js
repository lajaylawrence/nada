import { Foundation } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/core';
import { addDoc, arrayUnion, collection, doc, FieldValue, Firestore, getDoc, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import React, { Component, useEffect, useState} from 'react'
import { SafeAreaView, Text, TextInput, View, StyleSheet, Button, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, FlatList, TouchableOpacity, Image } from 'react-native'
import Header from '../components/Header'
import ReceiverMessage from '../components/ReceiverMessage';
import SenderMessage from '../components/SenderMessage';
import { db } from '../firebase';
import useAuth from '../hooks/useAuth';
import getMatchedUserInfo from '../lib/getMatchedUserInfo';

const ProfileReveal = () => {
  const { user } = useAuth();
  const {params} = useRoute();
  const { matchDetails } = params;
  const { match} = params;
  const [nadaMatchRequestArray, setNadaMatchRequestArray] = useState([]);

  useEffect(() => onSnapshot(doc(db, 'matches', matchDetails.id), snapshot => {
    setNadaMatchRequestArray(snapshot.data()?.nadaMatchRequest)
}), [matchDetails, db]);

  const matchObject = getMatchedUserInfo(matchDetails?.users, user.uid);

  console.log(matchObject.age);

  return (
    <View>
        {/* Users have yet to match each other */}
        {nadaMatchRequestArray?.length<2 &&  (
        <Text>{getMatchedUserInfo(matchDetails?.users, user.uid).displayName} awe you guys havent liked each oher yet</Text>
        
        )}

        {/* Users match each other */}
        {nadaMatchRequestArray?.length==2 && (
       
       <View style = {styles.continer1}>
        <View>
       <Image 
        style = {styles.image1}
        source={{uri: matchObject.profilePic}}
        />
        <Image 
        style = {styles.image2}
        source={{uri: 'https://i.stack.imgur.com/k5ygd.png'}}
        />
        </View>

        <Text style = {styles.text1}>{matchObject.displayName}   {matchObject.age}</Text>
        
        <View style = {styles.continer2}>

          <Text style={styles.description}>{matchObject.location}</Text> 

          <View style = {styles.continer3}>
            <View> 
            <Image 
              style = {styles.galleryImage}
              source={{uri: 'https://i.stack.imgur.com/k5ygd.png'}}
            /> 
            </View>
            <View> 
            <Image 
              style = {styles.galleryImage}
              source={{uri: 'https://i.stack.imgur.com/k5ygd.png'}}
            />  
            </View>
            <View> 
            <Image 
              style = {styles.galleryImage}
              source={{uri: 'https://i.stack.imgur.com/k5ygd.png'}}
            />  
            </View>
          </View>

          <Text style={styles.description}>
            {matchObject.userBio}
          </Text>

        </View>

        </View>
        
        )}
    </View>
  )
}

const styles = StyleSheet.create({
  continer1: {
    top: -30,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // padding: 20,
  },
  image1: {
    height: "90%",
    width: "100%",
    // maxHeight: 
    alignSelf: 'center',
    
  },
  image2: {
    top: "50%",
    left: -20,
    position: 'absolute',
    height: "50%",
    width: "120%",
    transform: [{ rotate: '180deg' }],
  },
  text1: {
    alignSelf: 'center',
    position: 'absolute',
    color: 'white',
    top: "75%",
    left: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  continer2:{
    backgroundColor: 'white',
    width: '100%',
    height: '50%',
    position: 'absolute',
    top: '80%',
    borderTopRightRadius: 60,
    borderTopLeftRadius: 60,
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 30,
  },
  description: {
  //  position: 'relative',
  //  alignSelf: 'center',
   color: 'black',
  },
  galleryImage: {
    height: 70,
    width: 70,
    margin: 10,
    
    alignSelf: 'center',
  },
  continer3: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 10,
    paddingLeft: 0,

  },

})

export default ProfileReveal
