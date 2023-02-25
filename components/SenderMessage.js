import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const SenderMessage = ({ message }) => {
  return (
    <View style={styles.view1}>

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
    }
   
})

export default SenderMessage
