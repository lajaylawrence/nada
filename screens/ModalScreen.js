import { View, Text, SafeAreaView, Image, TextInput, TouchableOpacity, } from 'react-native'
import React , { useLayoutEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import StyleSheet from 'react-native-extended-stylesheet'
import { useNavigation } from '@react-navigation/native'
import { serverTimestamp, setDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'

const ModalScreen = () => {
    const { user } = useAuth();
    const navigation = useNavigation();
    const [bio, setBio] = useState(null);
    const [location, setLocation] = useState(null);
    const [age, setAge] = useState(null);
    const [pic, setPic] = useState(null);

    const incompleteForm = !bio || ! location || !age || !(age > 17);

    const updateUserProfile = () => {
      setDoc(doc(db, 'users', user.uid), {
        id: user.uid,
        displayName: user.displayName,
        userBio: bio,
        location: location,
        age: age,
        profilePic: pic,
        timestamp: serverTimestamp(),
      }).then(() => {
        navigation.navigate('Home')
      }).catch(error => {
        alert(error.message);
      })
    };

  return (
    <View  style={{ alignItems: 'center'}}>
      <Image style={{height:200, width:"100%", backgroundColor:"transparent", top:-20}} 
      source={require('../assets/images/nada_logo.png')}
      resizeMode="contain"
      />

      <Text style={{top: -100,fontWeight:"700",}}> Welcome { user.displayName } </Text>

      <Text style={{textAlign:'center', fontWeight:"700", padding:10, color:'red',}}>
        Step 1: Write your bio.
      </Text>

      <TextInput style={{paddingBottom:30}}
      value={bio}
      onChangeText={(text) => setBio(text)}
      placeholder='Enter a short bio. Must be 800 characters or less' //Will determine the number of characters later
      maxLength={800}
      />

      <Text style={{textAlign:'center', fontWeight:"700", padding:10, color:'red', }}>
        Step 2: The Location
      </Text>

      <TextInput style={{paddingBottom:30}}
      value={location}
      onChangeText={(text) => setLocation(text)}
        placeholder='Enter the city and state you live'
      />

      <Text style={{textAlign:'center', fontWeight:"700", padding:10, color:'red', }}>
        Step 3: The Age
      </Text>

      <TextInput style={{paddingBottom:30}}
      value={age}
      onChangeText={(text) => setAge(text)}
        placeholder='Enter your age'
        keyboardType='numeric'
        maxLength={2}
      />

    <Text style={{textAlign:'center', fontWeight:"700", padding:10, color:'red',}}>
      Step 4: Add your profile pic
    </Text>

    <TextInput style={{paddingBottom:30}}
    value={pic}
    onChangeText={(text) => setPic(text)}
    placeholder='Add a link for your profile picture.'
    />

      <TouchableOpacity style={{ position: 'absolute', bottom: -100, backgroundColor:"#AA3FEC", width:170, height: 50, justifyContent: 'center', borderRadius: 20, }} 
      disabled={incompleteForm}
      onPress={updateUserProfile}
      >
        <Text style={{ textAlign:'center' }} > Update Profile </Text>
      </TouchableOpacity>


    </View>
  )
}

// const styles = StyleSheet.create({
//   {}
// })


export default ModalScreen


