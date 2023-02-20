import { View, Text, Button } from 'react-native'
import { useNavigation } from '@react-navigation/core';
import React from 'react'

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>This is my stack navigatoir</Text>
      <Button title='Go to chat screen' onPress={() =>  navigation.navigate('Chat')} />
      <Button title='Go to l screen' onPress={() =>  navigation.navigate('Login')} />
      <Button title='Go to s screen' onPress={() =>  navigation.navigate('SignUp')} />
    </View>
  )
}

export default HomeScreen