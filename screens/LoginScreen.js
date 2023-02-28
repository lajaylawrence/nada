import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text, Image, Button, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import useAuth from '../hooks/useAuth';



const LoginScreen = () => {
  const navigation = useNavigation();
  const {signInWithGoogle, facebookSignIn, loading} = useAuth();
  return (
    <View style={{flex: 1}}>
      <ImageBackground
      resizeMethod='cover'
      style={{flex: 1}}
      source={require('../assets/images/nada_login.png')}
      >
        <Image style={styles.logo_image} source={require('../assets/images/nada_logo_login.png')}></Image>
        <TouchableOpacity style={[styles.customButton,   {bottom: "30%"}, {marginHorizontal: '5%'},{alignSelf: 'center'}]}>
         {facebookSignIn()}
        </TouchableOpacity>
        <TouchableOpacity style={[styles.customButton,  {bottom: "22%"}, {marginHorizontal: '5%'},{alignSelf: 'center'}]}>
          <Image style={{position: 'absolute', alignSelf:"left", bottom: '50%'}} source={require('../assets/images/gg_icon.png')}></Image>
         {signInWithGoogle()}
        </TouchableOpacity>

      </ImageBackground>
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
  },
  customButton: {
    position: 'absolute',
    backgroundColor: 'white',
    padding: '4%',
    borderRadius: '20px',
    width: '60%',
  },
  logo_image: {
    position: 'absolute',
    top: '25%',
    alignSelf: 'center'
  }
 
});