import { Foundation } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/core';
import { addDoc, arrayUnion, collection, doc, FieldValue, Firestore, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import React, { Component, useEffect, useState} from 'react'
import { SafeAreaView, Text, TextInput, View, StyleSheet, Button, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, FlatList, TouchableOpacity } from 'react-native'
import Header from '../components/Header'
import ReceiverMessage from '../components/ReceiverMessage';
import SenderMessage from '../components/SenderMessage';
import { db } from '../firebase';
import useAuth from '../hooks/useAuth';
import getMatchedUserInfo from '../lib/getMatchedUserInfo';

const MessageScreen = () => {
    const { user } = useAuth();
    const {params} = useRoute();
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const { matchDetails } = params;
    const { nadaMatch } = true;

    useEffect(() => onSnapshot(query(collection(db, 'matches', matchDetails.id, 'messages'), orderBy('timestamp', 'desc')
        
        ), snapshot => setMessages(snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
        )
        ), [matchDetails, db]);

    const sendMessage = () => {
        addDoc(collection(db, 'matches', matchDetails.id, 'messages'), {
            timestamp: serverTimestamp(),
            userId: user.uid,
            displayName: user.displayName,
            photoURL: matchDetails.users[user.uid].profilePic,
            message:input
        });

        setInput("");
    };

    const nadaMatchRequest = () => {
            updateDoc(doc(db, 'matches', matchDetails.id), {
                nadaMatchRequest: arrayUnion(user.uid),
            }).then(() => {
              console.log("work")
            }).catch(error => {
              alert(error.message);
            })
         
        

        setInput("");
    };



    return (
      <SafeAreaView style={styles.safearea}>
        <Header title={getMatchedUserInfo(matchDetails?.users, user.uid).displayName} callEnabled nadaMatch/>


        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios'? 'padding' : 'height'}
            style={styles.keyboard}
            keyboardVerticalOffset={10}
        >

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <FlatList 
                    data={messages}
                    inverted={-1}
                    style={styles.flatlist1}
                    keyextractor={item => item.id}
                    renderItem={({ item: message }) =>
                        message.userId === user.uid? (
                            <SenderMessage key={message.id} message={message} />
                                ) : (
                            <ReceiverMessage key={message.id} message={message} />
                            )}
                />

            </TouchableWithoutFeedback>
            
        
        
        <View style={styles.view1}>
            <TextInput
                style={styles.input1}
                placeholder="Send Message"
                onChangeText={setInput}
                onSubmitEditing={sendMessage}
                value={input}
            />

        {true && (
        <TouchableOpacity onPress={nadaMatchRequest} style={styles.touchopacity2}>
            <Foundation name="photo"  size={20} color="#FF5864" style={{width:27, paddingLeft:5}}/>
        </TouchableOpacity>
        
        )}

        {false && (
        <TouchableOpacity onPress={nadaMatchRequest} style={styles.touchopacity2}>
            <Foundation name="photo"  size={20} color="#FF5864" style={{width:27, paddingLeft:5}}/>
        </TouchableOpacity>
        
        )}
            <Button onPress={sendMessage} title='Send' color="#FF5864" />
        </View>
        </KeyboardAvoidingView>
        
      </SafeAreaView>
    )
  }


  const styles = StyleSheet.create({
    input1: {
        fontSize: 14,
        // lineHeight: "1.75rem",
        // height: 5,
        paddingLeft: 10,
        maxWidth: "70%",
        minWidth: "70%",
    },
    view1: {
        // paddingTop: "0.5rem",
        // paddingBottom: "0.5rem",
        // paddingLeft: "1.25rem",
        // paddingRight: "1.25rem",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopWidth: 3,
        borderColor: "#E5E7EB",
        backgroundColor: "#ffffff",
    },
    keyboard: {
        flex: "1 1 0%",
        padding: 10,
    },
    safearea: {
        flex: "1 1 0%",
    },
    flatlist1: {
        paddingLeft: 16,
    },
    touchopacity2: {
        padding: 3,
        // marginRight: 4,
        right: -5,
        backgroundColor: "#FECACA",
        borderRadius: "9999px",
        justifyContent: "center",
    }

   
})

export default MessageScreen
