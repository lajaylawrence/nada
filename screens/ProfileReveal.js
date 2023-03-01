import { Foundation } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/core';
import { addDoc, arrayUnion, collection, doc, FieldValue, Firestore, getDoc, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import React, { Component, useEffect, useState} from 'react'
import { SafeAreaView, Text, TextInput, View, StyleSheet, Button, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, FlatList, TouchableOpacity } from 'react-native'
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

  
  return (
    <View>
        {/*  */}
        {nadaMatchRequestArray?.length<2 &&  (
        <Text>{getMatchedUserInfo(matchDetails?.users, user.uid).displayName} awe you guys havent liked each oher yet</Text>
        
        )}
        {/*  */}
        {nadaMatchRequestArray?.length==2 && (
        <Text>phot and some shit</Text>
        
        )}
    </View>
  )
}

export default ProfileReveal
