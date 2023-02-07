import { View, Text } from 'react-native'
import React, { createContext, useContext } from 'react'
import * as Google from "expo-google-app-auth";

const ContextAuth = createContext({

});

export const AuthenticationProvider = ({ children }) => {
  return (
    <ContextAuth.Provider 
    value={{
        user: null,
    }}>
        {children}
    </ContextAuth.Provider>
  )
}

export default function auth(){
    return useContext(ContextAuth);
}
