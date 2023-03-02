import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import {Foundation } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { collection, onSnapshot, where, query } from 'firebase/firestore';
import { db } from '../firebase';
import useAuth from '../hooks/useAuth';
import ChatRow from './ChatRow';

const ChatList = () => {
    const [matches, setMatches] = useState([]);
    const { user } = useAuth();

    useEffect(
        () =>
        onSnapshot(
            query(
            collection(db, "matches"), 
            where("usersMatched", "array-contains", user.uid)
            ),
            
            (snapshot) => 
            setMatches(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
            )
    ),
        [user]
    );


  return matches.length > 0 ? (
    <FlatList
        style={styles.flatlist1}
        data={matches}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ChatRow matchDetails={item} />}
    />
    ) : (
     <View style={styles.container1}>
        <Text> No Chats</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container1: {
        padding: 40,
        display: 'flex',
    },
    flatlist1: {
        height: "100%",
    }
   
})
export default ChatList
