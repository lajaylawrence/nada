import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const ReceiverMessage = ({message }) => {
  return (
    <View style={styles.view1}>

        <Image 
          style={styles.image}
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
      marginLeft: 5,
      marginRight: 5,
        backgroundColor: "#0d6625",
        borderRadius: 10,
        borderTopLeftRadius: 0,
        alignSelf: "flex-start", 
        marginLeft: 0,
    },
    text1:{
        color: "white",
    },
    image:{
      position: "absolute",
      top: 0,
      // left: 1,
      width: 10,
      height: 10,
      borderRadius: "9999px",      
    }
   
})
export default ReceiverMessage
