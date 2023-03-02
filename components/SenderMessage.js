import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
// import { LinearGradient } from 'expo-linear-gradient'

const SenderMessage = ({ message }) => {
  return (
    <View style={styles.view1}>

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
        backgroundColor: "#6427b3",
        borderRadius: 10,
        borderTopRightRadius: 0,
        alignSelf: "flex-end", 
        marginLeft: "auto",
    },
    text1:{
        color: "white",
    }
   
})

export default SenderMessage
