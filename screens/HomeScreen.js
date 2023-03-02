import { View, Text, Button, SafeAreaView, TouchableOpacity, Image, StyleSheet, Alert, ImageBackground } from 'react-native'
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import useAuth from '../hooks/useAuth';
import { FullWindowOverlay, ScreenStackHeaderRightView } from 'react-native-screens';
import { AntDesign, Entypo, Octicons, Feather, Ionicons} from "@expo/vector-icons"
import Swiper from "react-native-deck-swiper"
import { useFonts } from 'expo-font';
import { collection, doc, DocumentSnapshot, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import { db } from '../firebase'
import generateMatchID from '../lib/generateMatchID';


const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth(); //He uses useAuth
  const [profiles, setProfiles] = useState([]);
  const swipeRef = useRef(null); //creating a reference

  useLayoutEffect(() => {
    onSnapshot(doc(db, 'users', user.uid), snapshot => {
      if (!snapshot.exists()){
        navigation.navigate("Modal")
      }
    });
   
  });

  useEffect(() => {
    let unsub;

    const fetchCards = async () => {

      const passes = await getDocs(collection(db, 'users', user.uid, 'passes')).then(
        snapshot => snapshot.docs.map(doc => doc.id)
      );

      const swipes = await getDocs(collection(db, 'users', user.uid, 'swipes')).then(
        snapshot => snapshot.docs.map(doc => doc.id)
      );

      const passedUserIds = passes.length > 0 ? passes : ['test'];
      const swipedUserIds = swipes.length > 0 ? swipes : ['test'];
      
      unsub = onSnapshot(query(collection(db, 'users'), where('id', 'not-in', [...passedUserIds, ...swipedUserIds])
      ),
      snapshot => {
        setProfiles(
          snapshot.docs.filter(doc => doc.id !== user.uid).map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });
    };
    fetchCards();
    return unsub;
  }, [db]);

  //SwipeLeft function that keeps track of people you passed on
  const swipeLeft = (cardIndex) => {
    if (!profiles[cardIndex]){
      return;
    }

    const userSwiped = profiles[cardIndex];
    setDoc(doc(db, 'users', user.uid, 'passes', userSwiped.id), userSwiped);

  };

  //SwipeRight function that keeps track of people you match with
  const swipeRight = async(cardIndex) => {
    if (!profiles[cardIndex]){
      return;
    };

    const userSwiped = profiles[cardIndex];
    const loggedInProfile = await(
      await getDoc(doc(db, 'users', user.uid))
    ).data();
    

    //Check if another user swiped on you
    getDoc(doc(db, 'users', userSwiped.id, 'swipes', user.uid)).then(
      (documentSnapshot) => {
        if(documentSnapshot.exists()){

          //create a match
          setDoc(doc(db, 'users', user.uid, 'swipes', userSwiped.id),
          userSwiped); //record the swipe
          
          //CREATING MATCHES
          setDoc(doc(db, 'matches', generateMatchID(user.uid, userSwiped.id)), {
            users: {
              [user.uid]: loggedInProfile,
              [userSwiped.id]: userSwiped
            },
            usersMatched: [user.uid, userSwiped.id],
            timestamp: serverTimestamp(),
          });
          navigation.navigate('Matches', {
            loggedInProfile,
            userSwiped,
          });
          
        }else{
          setDoc(doc(db, 'users', user.uid, 'swipes', userSwiped.id), userSwiped);
          
        }
      })
    

  };



  return (
    <SafeAreaView style={{ flex: 1}}>

      {/* Header */}
      <View style={styles.container}>
      
        <TouchableOpacity>
        <Image style={styles.image2} source={require('../assets/images/nada_logo.png')}/>
        </TouchableOpacity>
        

        <TouchableOpacity onPress={() => navigation.navigate('Filter')}>
          <Feather name="filter" size={24} color="black" style={styles.image} /> 
         
          </TouchableOpacity>

      </View>
      {/* End of Header */}

      {/* Cards */}
      <View style={{position: "relative",}}>
        <Swiper 
        ref={swipeRef}
        containerStyle={{ backgroundColor: "transparent" }}
        cards ={profiles}
        stackSize={5}
        cardIndex={0}
        animateCardOpacity
        verticalSwipe={false}
        onSwipedLeft={(cardIndex) => {
          swipeLeft(cardIndex)}
       }
        onSwipedRight={(cardIndex) => {
          swipeRight(cardIndex)
        }
      }
        overlayLabels = {{
          left: {
            title: "PASS",
            style: {
              label: {
                textAlign: "right",
                color: "red"
              },
            },
          },
          right: {
            title: "MATCH",
            style: {
              label: {
                textAlign: "left",
                color: "green"
              },
            },
          },
        }}
        renderCard={ (card) => card ?  (
          <View key={card.id} style={{ position: "relative", backgroundColor: "transparent", height: 500, borderRadius: 12,}}>
            <ImageBackground style= {{ flex: 1 }} source={ require("../assets/images/bckgrnd_col1.png") } imageStyle={{ borderRadius: 15 }} />
            {/* <Text> This is some text that is to be added for the user bio </Text> */}
            <View style={{position: "absolute", alignContent: "center", alignItems: "center", top: 50}}>
              <View style={{position: "relative", height: 300, alignItems: "center", left:0,flexDirection:'row'}}>
                <Text style={{flexWrap:'wrap', padding: 10}}> 
                  { card.userBio}
                </Text>
              </View>

              <View style={{padding:10, position: 'absolute', top: 380, left: 0,  justifyContent: 'center', alignItems: 'left', flex: 1, borderRadius: 12}}>  
                <Text style={{ color:"white"}} > {card.displayName}, {card.age} </Text>
                <Text style={{color:"white"}} > {card.location} </Text>
              </View>
            </View>

            {/* <View style={{position:"absolute", justifyContent:'space-evenly', top: 610, flexDirection: "row", alignItems: 'center' }}>

            </View> */}
          </View>
         ) : (
            <View style={{height: 500, position:'relative', backgroundColor:'white', justifyContent:'center', alignItems:'center', borderRadius: 12,}}>
              <Text style={{fontWeight: "500", fontSize:20}}> No more profiles </Text>
            </View>

         )}

        />

      </View>
      {/* End of Cards */}

      {/* Like and Dislike Buttons */}
      <View style={{position:"relative", justifyContent:'space-evenly', top: 610, flexDirection: "row", alignItems: 'center'}}>
        <TouchableOpacity onPress={() => swipeRef.current.swipeLeft()} style={{backgroundColor:"red", borderRadius:65, width:60, height:60, alignItems:"center", justifyContent:"center"}}>
          <Entypo name="cross" size={30} style={{color:"white"}}/>

        </TouchableOpacity >
        

        <TouchableOpacity onPress={() => swipeRef.current.swipeRight()} style={{backgroundColor:"#AA3FEC", borderRadius:65, width:60, height:60, alignItems:"center", justifyContent:"center"}}>
        <AntDesign name="heart" size={22} style={{color:"white"}}/>
        </TouchableOpacity>
      </View>
      {/* End of Like and Dislike Buttons */}

      {/* Navbar */}
      <View style={{alignItems:"center",position:"relative", justifyContent:"space-evenly", backgroundColor:"white", top: 630, height:80, borderRadius:30, flexDirection:"row"}}>
          <TouchableOpacity>
            <AntDesign name="home" size={30} style={{backgroundColor:"white"}}/>

          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('MatchedList')}>
            <AntDesign name="hearto" size={30} style={{backgroundColor:"white"}} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
            <Ionicons name="ios-chatbox-ellipses-outline"  size={30} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Octicons name="person" size={30}/>
          </TouchableOpacity>
      </View>
      {/* End of navbar */}



    </SafeAreaView>
  );


};


//Styles
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 5,
      paddingTop: 20,
      
      
      
    },
    image: {
      position: 'absolute',
      left: -30,
    },

    image2: {
      width: 200,
      height: 60,
      position: 'absolute',
      left: 70,
    },

    cardSwiper: {
      flex: 1,
      marginTop: -6,
    },
    cardShadow: {

    }
  });

export default HomeScreen;

