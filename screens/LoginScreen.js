// expo install expo-web-browser expo-auth-session expo-random
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import GoogleSignIn from '../hooks/auth';
import facebookSignIn from '../hooks/auth_fb';



const LoginScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {GoogleSignIn()}
      {facebookSignIn()}
    </View>
  );

}

export default LoginScreen



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: 50,
    height: 50
  }
});