import { View, Text, SafeAreaView, StyleSheet} from 'react-native'
import React from 'react'
import Header from '../components/Header'
import ChatList from '../components/ChatList'

const ChatScreen = () => {
  return (
    <SafeAreaView>
      <Header title="Chat" callEnabled/>
      <ChatList />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container1: {
      padding: 2,
      flexDirection:"row",
      justifyContent:'space-between',
      alignItems: 'center',
  }
  
});

export default ChatScreen