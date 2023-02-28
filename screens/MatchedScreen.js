import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/core'

const MatchedScreen = () => {
    const navigation = useNavigation();
    const { params } = useRoute();

    const { loggedInProfile, userSwiped } = params;
  return (
    <View style={{height:"100%", backgroundColor:'red', paddingTop: 20, opacity:0.89,}}>

    <View style={{  justifyContent:'center', padding: 10, paddingTop:20}} >
      <Text> Hello </Text>
    </View>

    <Text style={{color:'blue',color:'blue', justifyContent:'center', marginTop: 5}}>

    </Text>
    </View>
  )
}

export default MatchedScreen;