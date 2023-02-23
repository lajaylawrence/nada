import { View, Text, Button } from 'react-native'
import { useNavigation } from '@react-navigation/core';
import React from 'react'
import useAuth from '../hooks/useAuth';

const HomeScreen = () => {
  const navigation = useNavigation();
  const {logout} = useAuth();
  return (
    <View>
      <Text>This is my stack navigatoir</Text>
      <Button title='Go to chat screen' onPress={() =>  navigation.navigate('Chat')} />
      <Button title='Go to l screen' onPress={() =>  navigation.navigate('Login')} />
      <Button title='Go to s screen' onPress={() =>  navigation.navigate('SignUp')} />
      <Button title='logout' onPress={()=> logout()}/>
    </View>
  )
}

export default HomeScreen