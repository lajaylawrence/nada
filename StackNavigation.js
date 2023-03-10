import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import filterFeature from './screens/filterFeature';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import useAuth from './hooks/useAuth';
import ModalScreen from './screens/ModalScreen';
import MessageScreen from './screens/MessageScreen';
import MatchedScreen from './screens/MatchedScreen';
import MatchedListScreen from './screens/MatchedListScreen';
import ProfileReveal from './screens/ProfileReveal';

const Stack = createNativeStackNavigator(); 

const StackNavigator = () => {
    const {user} = useAuth();


        return (
            <Stack.Navigator screenOptions={{
                headerShown: false,
            }}>
                {user ? (
                <>
                    <Stack.Group>
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="Chat" component={ChatScreen}/>
                        <Stack.Screen name="Message" component={MessageScreen}/>
                    </Stack.Group>
                    <Stack.Group screenOptions={{presentation: "modal"}}>
                        <Stack.Screen name="Modal" component={ModalScreen} />
                        <Stack.Screen name="profileReveal" component={ProfileReveal} />
                        <Stack.Screen name="Filter" component={filterFeature} />
                        <Stack.Screen name="MatchedList" component={MatchedListScreen} />
                    </Stack.Group>
                    <Stack.Group screenOptions={{presentation: 'transparentModal'}}>
                        <Stack.Screen name="Matches" component={MatchedScreen} />
                    </Stack.Group>
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