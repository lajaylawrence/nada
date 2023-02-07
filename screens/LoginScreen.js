import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const LoginScreen = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>This is the LoginScreen</Text>
      <Button title='SignUp' onPress={() =>  navigation.navigate('SignUp')} />
    </View>
  )
}

export default LoginScreen