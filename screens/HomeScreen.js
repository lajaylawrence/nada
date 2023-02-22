import { View, Text, Button, SafeAreaView, TouchableOpacity, Image, StyleSheet, Alert, ImageBackground } from 'react-native'
import { useNavigation } from '@react-navigation/core';
import React, { useLayoutEffect, useRef } from 'react'
import auth from '../hooks/auth';
import { FullWindowOverlay, ScreenStackHeaderRightView } from 'react-native-screens';
import { AntDesign, Entypo, Octicons, Feather, Ionicons} from "@expo/vector-icons"
import Swiper from "react-native-deck-swiper"
import { useFonts } from 'expo-font';

const DUMMY_TEXT = `Lorem ipsum dolor sit amet, 
consectetur adipiscing elit, 
sed do eiusmod tempor incididunt 
ut labore et dolore magna aliqua.
Ut enim ad minim veniam,
quis nostrud exercitation ullamco
laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit
in voluptate velit esse cillum dolore eu fugiat 
nulla pariatur. Excepteur sint occaecat cupidatat 
non proident, sunt in culpa qui officia 
deserunt mollit anim id est laborum.`

const DUMMY_DATA = [
  {
    firstName: "Dacha",
    lastName: "Anderson",
    distance: "5 miles",
    photoURL: require("../assets/images/bckgrnd_col1.png"), //Needs to be user info not image
    age: 18,
    id: 123,
  },
  {
    firstName: "Lloyd",
    lastName: "Baugh",
    distance: "9 miles",
    photoURL: require("../assets/images/bckgrnd_col2.png"),
    age: 23,
    id: 124,
  },
  {
    firstName: "Jason",
    lastName: "Jackson",
    distance: "10 miles",
    photoURL: require("../assets/images/bckgrnd_col1.png"),
    age: 20,
    id: 125,
  },

]

//Creating an alert button for testing purposes
const alert = () => {
  Alert.alert(
    'Alert',
    'Button Works',
    {
      cancelable: true,
    },
  );
   
}
//End of alert button

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = auth(); //He uses useAuth
  const swipeRef = useRef(null); //creating a reference

  return (
    <SafeAreaView style={{ flex: 1}}>

      {/* Header */}
      <View style={styles.container}>
      
        <TouchableOpacity onPress={alert} >
        <Image style={styles.image2} source={require('../assets/images/nada_logo.png')}/>
        </TouchableOpacity>
        

        <TouchableOpacity onPress={alert}>
          <Feather name="filter" size={24} color="black" style={styles.image} /> 
         
          </TouchableOpacity>

      </View>
      {/* End of Header */}

      {/* Cards */}
      <View style={{position: "relative",}}>
        <Swiper 
        ref={swipeRef}
        containerStyle={{ backgroundColor: "transparent" }}
        cards ={DUMMY_DATA}
        stackSize={5}
        cardIndex={0}
        animateCardOpacity
        verticalSwipe={false}
        onSwipedLeft={() => console.log("Swipe PASS")}
        onSwipedRight={() => console.log("Swipe MATCH")}
        overlayLabels = {{
          left: {
            title: "NOPE",
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
        renderCard={ (card) => (
          <View key={card.id} style={{ position: "relative", backgroundColor: "transparent", height: 500, borderRadius: 12,}}>
            <ImageBackground style= {{ flex: 1 }} source={ card.photoURL } imageStyle={{ borderRadius: 15 }} />
            {/* <Text> This is some text that is to be added for the user bio </Text> */}
            <View style={{position: "absolute", alignContent: "center", alignItems: "center", top: 50}}>
              <View style={{position: "absolute", height: 300, alignItems: "center", left: 30}}>
                <Text> 
                  { DUMMY_TEXT }
                </Text>
              </View>

              <View style={{padding:10, position: 'absolute', top: 380, left: 0,  justifyContent: 'center', alignItems: 'left', flex: 1, borderRadius: 12}}>  
                <Text style={{ color:"white", useFonts}} > {card.firstName}, {card.age} </Text>
                <Text style={{color:"white"}} > {card.distance} </Text>
              </View>
            </View>
          </View>
         )}

        />

      </View>
      {/* End of Cards */}

      <View style={{position:"relative", justifyContent:'space-evenly', top: 610, flexDirection: "row", alignItems: 'center'}}>
        <TouchableOpacity onPress={alert} style={{backgroundColor:"red", borderRadius:65, width:60, height:60, alignItems:"center", justifyContent:"center"}}>
          <Entypo name="cross" size={30} style={{color:"white"}}/>

        </TouchableOpacity >
        

        <TouchableOpacity onPress={alert} style={{backgroundColor:"#AA3FEC", borderRadius:65, width:60, height:60, alignItems:"center", justifyContent:"center"}}>
        <AntDesign name="heart" size={22} style={{color:"white"}}/>
        </TouchableOpacity>
      </View>

      {/* Navbar */}
      <View style={{alignItems:"center",position:"relative", justifyContent:"space-evenly", backgroundColor:"white", top: 630, height:80, borderRadius:30, flexDirection:"row"}}>
          <TouchableOpacity onPress={alert}>
            <AntDesign name="home" size={30} style={{backgroundColor:"white"}}/>

          </TouchableOpacity>

          <TouchableOpacity onPress={alert}>
            <AntDesign name="hearto" size={30} style={{backgroundColor:"white"}} />
          </TouchableOpacity>

          <TouchableOpacity onPress={alert}>
            <Ionicons name="ios-chatbox-ellipses-outline"  size={30} />
          </TouchableOpacity>

          <TouchableOpacity onPress={alert}>
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
  });

export default HomeScreen;
