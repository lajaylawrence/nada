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
    const [job, setJob] = useState(null);
    const [age, setAge] = useState(null);

    const incompleteForm = !bio || ! job || !age || !(age > 17);

    const updateUserProfile = () => {
      setDoc(doc(db, 'users', user.uid), {
        id: user.uid,
        displayName: user.displayName,
        userBio: bio,
        job: job,
        age: age,
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
        Step 1: The profile pic
      </Text>

      <TextInput style={{paddingBottom:30}}
      value={bio}
      onChangeText={(text) => setBio(text)}
      placeholder='Enter a short bio. Must be 100 characters or less' //Will determine the number of characters later
      maxLength={100}
      />

      <Text style={{textAlign:'center', fontWeight:"700", padding:10, color:'red', }}>
        Step 2: The Job
      </Text>

      <TextInput style={{paddingBottom:30}}
      value={job}
      onChangeText={(text) => setJob(text)}
        placeholder='Enter your occupation'
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


