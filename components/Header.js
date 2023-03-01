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
            <Ionicons name="chevron-back-outline"  size={34} color="#FF5864"/>
          </TouchableOpacity>
          <Text style={styles.text1} onPress={() => navigation.navigate('profileReveal',{matchDetails})} >{title}</Text>
        </View>

       
        
        {callEnabled && (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.touchopacity2}>
            <Foundation name="telephone"  size={30} color="#FF5864" style={{width:30, paddingLeft:5}}/>
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
    },
    container2: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    text1: {
        fontWeight: "700",
        fontSize: 18,
    },
    touchopacity2: {
        padding: 3,
        marginRight: 4,
        right: 0,
        backgroundColor: "#FECACA",
        borderRadius: "9999px",
        justifyContent: "center",
    }
    
  });
  
export default Header;
