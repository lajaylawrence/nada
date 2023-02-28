import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

const MatchedScreen = () => {
    const navigation = useNavigation();
    const { params } = useRoute();

    // const { loggedInProfile, userSwiped } = params;
  return (
    <View style={{height:"100%", backgroundColor:'#AA3FEC', paddingTop: 20, opacity:0.9,}}>

    <View style={{justifyContent:'center', padding: 10, paddingTop:60, alignItems:'center', marginTop: 5}} >
      <Image source={require('../assets/images/match_logo.png')} style={{ backgroundColor: 'red'}} />
    </View>

    <Text style={{color:'blue', justifyContent:'center', marginTop: 5}}>
      { userSwiped.displayName } liked you too !!
    </Text>

    <View style={{flex:'row', }}>

    </View>
    </View>
  )
}

export default MatchedScreen;