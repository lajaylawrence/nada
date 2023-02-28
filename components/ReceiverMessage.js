import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

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
        paddingTop: "0.75rem",
        paddingBottom: "0.75rem",
        paddingLeft: "1.25rem",
        paddingRight: "1.25rem",
        marginTop: "0.5rem",
        marginBottom: "0.5rem",
        marginLeft: "0.75rem",
        marginRight: "0.75rem",
        backgroundColor: "#7C3AED",
        borderTopRightRadius: "0",
        alignSelf: "flex-start", 
        marginLeft: "auto",
    },
    text1:{
        color: "white",
    },
    image:{
      position: "absolute",
      top: "0",
      left: "-3.5rem",
      width: "3rem",
      height: "3rem",
      borderRadius: "9999px",      
    }
   
})
export default ReceiverMessage
