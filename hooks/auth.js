import { View, Text } from 'react-native'
import React, { createContext, useContext } from 'react'
// import * as Google from "expo-google-app-auth";
import * as Google from 'expo-auth-session/providers/google';

const ContextAuth = createContext({});

const config = {
  iosClientId: "263793207130-kmracnptuetpn304isemdef1etos6v9u.apps.googleusercontent.com",
  // androidClientId: "263793207130-f6iftc9tlq5se3n5anr829rrmgr3i5ps.apps.googleusercontent.com",
  scopes: ['profile', 'email'],
  permissions: ["public_profile", "email", "gender", "location"],
}

export const AuthenticationProvider = ({ children }) => {
  const signInWithGoogleAsync = async () => {
    Google.useAuthRequest(config).then(async (logInResult) => {
      if(logInResult.type === "success") {
        //login
      }
    });
  }


  return (
    <ContextAuth.Provider 
    value={{
        user: null,
        signInWithGoogleAsync,
    }}>
        {children}
    </ContextAuth.Provider>
  )
}

export default function auth(){
    return useContext(ContextAuth);
}
