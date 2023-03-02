import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import {Foundation } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import useAuth from '../hooks/useAuth';

const Header = ({title, callEnabled, matchDetails}) => {
    const navigation = useNavigation();
  return (
    <View style={styles.container1}>
        <View style={styles.container2}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{padding:2}}>
            <Ionicons name="chevron-back-outline"  size={34} color="#ffb836"/>
          </TouchableOpacity>
          <Text style={styles.text1} onPress={() => navigation.navigate('profileReveal',{matchDetails})} >{title}</Text>
        </View>

       
        
        {callEnabled && (
        <TouchableOpacity onPress={() => navigation.navigate('profileReveal',{matchDetails})} style={styles.touchopacity2}>
            <Foundation name="eye"  size={30} color="#d61c2b" style={{width:30, paddingLeft:5}}/>
        </TouchableOpacity>
        
        )}
    </View>
  );
};

const styles = StyleSheet.create({
    container1: {
        padding: 2,
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: "#E5E7EB",
        paddingBottom: 5,
    },
    container2: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    text1: {
        fontWeight: "700",
        fontSize: 18,
        color: "#e09304",
        opacity: 0.8,
        
    },
    touchopacity2: {
        padding: 3,
        marginRight: 4,
        right: 0,
        backgroundColor: "#ffc9e2",
        borderRadius: "9999px",
        justifyContent: "center",
    }
    
  });
  
export default Header;
