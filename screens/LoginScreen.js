import { View, Text, Button } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import auth from '../hooks/auth';

const LoginScreen = () => {
  // const navigation = useNavigation();
  const { signinWithGoogle } = auth();
  return (
    <View>
      <Text>This is the Login Screen</Text>
      <Button title='login' onPress={signinWithGoogle} />
    </View>
  )
}

export default LoginScreen