import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

const MatchedScreen = ({}) => {
    const navigation = useNavigation();
    const { params } = useRoute();

    const { userSwiped } = params;

  return (
    <View style={{height:"100%", backgroundColor:'#AA3FEC', paddingTop: 20, opacity:0.95,}}>

    <View style={{justifyContent:'center', padding: 10, paddingTop:60, alignItems:'center', marginTop: 5}} >
      <Image source={require('../assets/images/match_logo.png')} style={{ backgroundColor: 'transparent', height: 100, width:'100%', top: 20}} />
    </View>

    <View style={{alignItems:'center'}}>
      <Text style={{color:'white', justifyContent:'center', marginTop: 5,alignItems:'center', alignContent:'center', fontWeight: "100%"}}>
        { userSwiped.displayName } liked you too !!
      </Text>
    </View>

    <View style={{flexDirection:'row', justifyContent:'space-evenly',top: 30, }}>
      <Image
      style={{height:100, width: 100, borderRadius:100, right: -40, borderWidth:4, borderColor: '#AA3FEC'}}
      source={{uri:"https://www.shutterstock.com/image-illustration/male-profile-silhouette-question-mark-260nw-184865651.jpg"}}
      />

      <Image
      style ={{height:100, width: 100, borderRadius:100, borderWidth:4, borderColor: '#AA3FEC', left: -60}}
      source={{uri:"https://www.shutterstock.com/image-illustration/male-profile-silhouette-question-mark-260nw-184865651.jpg"}}
      />
    </View>

    <TouchableOpacity style={{ top: 50, backgroundColor:'#BB34D2', padding:20, borderRadius: 100, margin: 20,}}
    onPress={() => {
      navigation.goBack()
      navigation.navigate('Chat')
      }}
      >
      <Text style={{color:'white',textAlign:'center',}}> SEND A MESSAGE </Text>
    </TouchableOpacity>

    <TouchableOpacity style={{backgroundColor:'white', padding:20, borderRadius: 100, margin: 20, borderWidth:4, borderColor: '#BB34D2', backgroundColor:'transparent', top:30}}
    onPress={() => navigation.navigate('Home')}>
      <Text style={{color:'white',textAlign:'center',}}> KEEP SWIPING </Text>
    </TouchableOpacity>


    </View>
  )
}

export default MatchedScreen;