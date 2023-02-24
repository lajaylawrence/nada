import { View, Text, SafeAreaView, Image } from 'react-native'
import React from 'react'

const ModalScreen = () => {
  return (
    <View style={{flex:1, alignItems:"center", paddingTop: 10}}>
      <Image style={{height:80, width: "100%"}} 
      source={require('../assets/images/nada_logo.png')}
      resizeMode="contain"
      />
    </View>
  )
}

export default ModalScreen