import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const ReceiverMessage = ({message }) => {
  return (
    <View style={styles.view1}>

        <Image 
          style={styles.image}
          source={{uri: 'https://static.vecteezy.com/system/resources/thumbnails/009/902/706/small_2x/user-approved-icon-3d-render-png.png'}}
        />
        <Text style={styles.text1}> {message.message}</Text>

    </View>
  )

  
}



const styles = StyleSheet.create({
    view1:{
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 12,
      paddingRight: 12,
      marginTop: 5,
      marginBottom: 5,
      marginLeft: 30,
      marginRight: 5,
        backgroundColor: "#f7a202",
        borderRadius: 10,
        borderTopLeftRadius: 0,
        alignSelf: "flex-start", 
    },
    text1:{
        color: "white",
    },
    image:{
      position: "absolute",
      top: -15,
      left: -55,
      width: 40,
      height: 40,
      borderRadius: 2,    
      margin: 10,  
    }
   
})
export default ReceiverMessage
