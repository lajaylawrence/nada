import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import {Foundation } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { collection, onSnapshot, where, query } from 'firebase/firestore';
import { db } from '../firebase';

const ChatList = () => {
    const [matches, setMatches] = useState([]);

    // useEffect(
    //     () =>
    //     onSnapshot(
    //         collection(db, 'matches'), 
    //         where('usersMatches', 'array-conatins', user.uid)
    //         ),
    //         (snapshot) => 
    //         setMatches(
    //             snapshot.docs.map((doc) => ({
    //                 id: doc.id,
    //                 ...doc.data(),
    //             }))
    //         ),
    //     []
    // );
    
  return (
    <View style={styles.container1}>
        
        <Text> chatlist..</Text>

    </View>
  )
}

const styles = StyleSheet.create({
    container1: {
        padding: 20,
        display: 'flex',
    }
   
})
export default ChatList
