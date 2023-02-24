import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import Header from '../components/Header'

const ChatScreen = () => {
  return (
    <SafeAreaView>
      <Header title="Chat"/>
      <Text>I am the chat screen</Text>
    </SafeAreaView>
  )
}

export default ChatScreen