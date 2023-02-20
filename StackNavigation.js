import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';

const Stack = createNativeStackNavigator(); 

const StackNavigator = () => {
    const user = false;

        return (
            <Stack.Navigator>
                {user ? (
                <>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Chat" component={ChatScreen}/>
                    <Stack.Screen name="Profile" component={ProfileScreen} />
                </>
         
                ): (
                    <>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="SignUp" component={SignUpScreen} />
                    </>         
                )}
 
            </Stack.Navigator>
          );
  
};

export default StackNavigator