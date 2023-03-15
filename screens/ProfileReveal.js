import { Foundation } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/core';
import { addDoc, arrayUnion, collection, doc, FieldValue, Firestore, getDoc, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import React, { Component, useEffect, useState} from 'react'
import { SafeAreaView, Text, TextInput, View, StyleSheet, Button, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, FlatList, TouchableOpacity, Image } from 'react-native'
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

  const matchObject = getMatchedUserInfo(matchDetails?.users, user.uid);

  // console.log(matchObject.age);

  return (
    <View>
       
        {nadaMatchRequestArray?.length != 2 &&  (
        <View>
          <Text style={styles.unMatchedMessage}> OH NO! </Text>
          <Text style={styles.unMatchedMessage2}> It seems you guys haven't Supermatched yet</Text>
          <Text style={styles.unMatchedMessage3}> Once you both superlike each other, you'll be able to </Text>
          <Text style={styles.unMatchedMessage3}> see {matchObject.displayName}'s profile.</Text>
          <Image 
            style = {styles.image55}
            source={{uri: 'https://cdn3d.iconscout.com/3d/premium/thumb/sad-5590665-4652570.png'}}
          />

        </View>
        
        )}

        {/* Users match each other */}
        {nadaMatchRequestArray?.length==2 && (
       
       <View style = {styles.continer1}>
        <View>
       <Image 
        style = {styles.image1}
        source={{uri: matchObject.profilePic}}
        />
        <Image 
        style = {styles.image2}
        source={{uri: 'https://i.stack.imgur.com/k5ygd.png'}}
        />
        </View>

        <Text style = {styles.text1}>{matchObject.displayName}   {matchObject.age}</Text>
        
        <View style = {styles.continer2}>

          <View style = {[styles.continer3, styles.container4]}>
          <Text style={styles.description}>{matchObject.location}</Text> 
          <Foundation name="marker"  size={15} color="#FF5864" style={{width:27, paddingLeft:5}}/>
          </View>

          <View style = {styles.continer3}>
            <View> 
            <Image 
              style = {styles.galleryImage}
              source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRY-5v-rf-FaAY2WeLOTKQmTrGYfKPJUUbjay33r_1SRDJD2wNbHzU_qOdYBWSKU0AXg8&usqp=CAU'}}
            /> 
            </View>
            <View> 
            <Image 
              style = {styles.galleryImage}
              source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNuB07NLUNdDigodog7m0GhgZAtWtSM4M35FicgGODxqQQXy7i8DMM9GCpeCrKtY961u0&usqp=CAU'}}
            />  
            </View>
            <View> 
            <Image 
              style = {styles.galleryImage}
              source={{uri: 'https://images.unsplash.com/photo-1632498301446-5f78baad40d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MXx8fGVufDB8fHx8&w=1000&q=80'}}
            />  
            </View>
            <View> 
            <Image 
              style = {[styles.galleryImage, styles.galleryImageLast]}
              source={{uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0HBwcHBw4PBwcHBw0HBwcHDQ8ICQcNFREWFhURFRUYHSggGBoxJxUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAP4AxwMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAAABAMBB//EABYQAQEBAAAAAAAAAAAAAAAAAAASEf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD2+imdFA0opnRQNKKZ0UDSimdFA0opnRQNKKZ0UDSimdFA0opnRQNKKZ0UDSimdFA0opnRQNKKZ0UDShnQDKimNFA2opjTtA1opjRQNqKZU5QNqKY0UDaimNFA2opjRQNqKY0UDaimNFA2opjRQNqKY0UDaimNFA2oZUAwopjRQNqKY0UDaimNFA2opjRQNqKY0UDanaYUUDaimNFA2opjRQNqKY0UDaimNFA2opjRQNqKY0UDanWFAMaKT2WCiyk9lgootPZYKLKT2WCiik9lgoopPZYKLKT2WCiik9lgoopPZYKKLT2WCiy09lgoopPZYKLcYWAwstPZYKLLT2WCiy09lgostPZYKLLT2WCiy09lgostPZYKLLT2WCiy09lgostPZYKLLT2WCiy09lgosT2AnstNZYKbLTWWCmy01lgpstNZYKbLTWWCmy01lgpstNZYKbLTWWCmy01lgpstNZYKbLTWWCmy01lgpsTWAnstNZYKbLTWWCmy01lgpstNZYKbLTWWCmy01lgpstNZYKbLTWWCmy01lgpstNZYKbLTWWCmy01lgpsTWAmstPZYKLLT2WCiy09lgostPZYKLLT2WCiy09lgostPZYKLLT2WCiy09lgostPZYKLLT2WCiy09lgosT2AmstNZYKbLTWWCmy01lgpstNZYKbLTWWCmy01lgpstNZYKbLTWWCmy01lgpstNZYKbLTWWCmy01lgpsTWAmstPZYKLLT2WCiy09lgostPZYKLLT2WCiy09lgostPZYKLLT2WCiy09lgostPZYKLLT2WCiy09lgosT2AmstPZYKLLT2WCiy09lgostPZYKLLT2WCiy09lgostPZYKLLT2WCiy09lgostPZYKLLT2WCiy09lgosT2AnstPZYKLLT2WCiy09lgostPZYKLLT2WCiy09FgostPZYKLLT2WCiy09FgostPZYKLLT2WCiy09lAosT2AnothRQN7LYUUDeymFFA3sthRQN7LYUUDey2FFA3sthRQN7LYUUDey2FFA3sthRQN7LYUUDey2FFA3sYUAwopjRQNqKY0UDaimNFA2opjRQNqKY0UDaimNFA2opjRQNqKY0UDaimNFA2opjRQNqKY0UDaimNFA2p1hQDGimVFA1oplRQNaKZUUDWimVFA1oplRQNaKZUUDWimVFA1oplRQNaKZUUDWimVFA1oplRQNaKZUUDWhlQDKimemg0opnpoNKKZ6aDSimemg0opnpoNKKZ6aDSimemg0opmaDSimemg0opnpoNKKZ6aDSimemg0oZ6A//9k='}}
            />  
            </View>
          </View>

          <Text style={styles.description}>
            {matchObject.userBio}
          </Text>

        </View>

        </View>
        
        )}
    </View>
  )
}

const styles = StyleSheet.create({
  continer1: {
    top: -30,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    // padding: 20,
  },
  image1: {
    height: "90%",
    width: "100%",
    top: -2,
    // maxHeight: 
    alignSelf: 'center',
    
  },
  image2: {
    top: "50%",
    left: -20,
    position: 'absolute',
    height: "50%",
    width: "120%",
    transform: [{ rotate: '180deg' }],
  },
  text1: {
    alignSelf: 'center',
    position: 'absolute',
    color: 'white',
    top: "75%",
    left: 70,
    fontSize: 20,
    fontWeight: 'bold',
  },
  continer2:{
    backgroundColor: 'white',
    width: '100%',
    height: '50%',
    position: 'absolute',
    top: '80%',
    borderTopRightRadius: 60,
    borderTopLeftRadius: 60,
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 30,
  },
  description: {
  //  position: 'relative',
  //  alignSelf: 'center',
   color: '#585161',
   maxWidth: '80%',
  },
  galleryImage: {
    height: 70,
    width: 70,
    margin: 5,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 5,
  },
  galleryImageLast: {
    transform: [{ rotate: '90deg' }],
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    opacity: 0.2,
  },
  continer3: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 2,
    paddingLeft: 0,
    marginTop: 5,
    borderTopWidth: 2,
    borderColor: '#ededed',

  },
  container4: {
    borderTopWidth: 0,
  },
  unMatchedContainer: {
    display: 'inline-block',
    padding: 10,

  },
  unMatchedMessage: {
    alignSelf: 'center',
    top: 300,
    fontWeight: 'bold',
    fontSize: 20,
    color: '#897a91',
  },
  unMatchedMessage2: {
    alignSelf: 'center',
    top: 310,
    fontWeight: 'bold',
    fontSize: 15,
    color: '#897a91',
  },
  unMatchedMessage3: {
    alignSelf: 'center',
    top: 310,
    fontWeight: 'bold',
    fontSize: 10,
    color: '#897a91',
  },
  image55: {
    height: '50%',
    width: '50%',
    top: '30%',
    alignSelf: 'center',
  },

})

export default ProfileReveal
