import { View, Text, Button } from 'react-native'
import React, { createContext, useContext, useEffect, useState } from 'react'
import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import {GoogleAuthProvider, FacebookAuthProvider, onAuthStateChanged, signInWithCredential, signOut } from 'firebase/auth';
import * as Facebook from 'expo-auth-session/providers/facebook';
import {auth, db} from '../firebase'


WebBrowser.maybeCompleteAuthSession();

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [error, setError] = useState(null)
    const [user, setUser] = useState(null);
    const [loadingIntial, setLoadingInitial] = useState(true);
    const [loading, setLoading] = useState(false);
    useEffect(
        () =>  onAuthStateChanged(auth, (user)=>{
            if (user){
                setUser(user);

            } else {
                setUser(null);
            }
            setLoadingInitial(false)
        }),
     []);

    const logout = () => {
        setLoading(true);

        signOut(auth)
        .catch((error) => setError(error))
        .finally(()=> setLoading(false));
    }

    function signInWithGoogle () {
        setLoading(true);
        const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
            {
              androidClientId: "263793207130-msocdf6sal7l1d4seqkq61khhtk5oqt9.apps.googleusercontent.com",
              iosClientId: "263793207130-reqapsjgtdh8465p86gef4boat9scqvv.apps.googleusercontent.com",
              expoClientId: "263793207130-3hi3ev4qkmd3b7tjlugr0b53hapefd9k.apps.googleusercontent.com"
            },
          );
        
          useEffect(() => {
            try {
                if (response?.type === 'success') {
                    const { id_token } = response.params;
                    const credential = GoogleAuthProvider.credential(id_token);
                    signInWithCredential(auth, credential);
                  }
            } catch(error) {
                setError(error);
            } finally {
                setLoading(false);
            }
           
          }, [response]);

          return (
            <Button
              disabled={!request}
              title="Login"
              onPress={() => {
                promptAsync();
              }}
            />
          );
        
    }

    function facebookSignIn() {
        setLoading(true);
        const [request, response, promptAsync] = Facebook.useAuthRequest({
          responseType: ResponseType.Token,
          clientId: '6168234213219457',
          expoClientId: '6168234213219457'
        });
      
        useEffect(() => {
            try {
            if (response?.type === 'success') {
                const { access_token } = response.params;
                const credential = FacebookAuthProvider.credential(access_token);
                // Sign in with the credential from the Facebook user.
                signInWithCredential(auth, credential);
                }
            } catch(error){
                setError(error)
            } finally {
                setLoading(false);
            }
         
        }, [response]);
      
        return (
          <Button
            disabled={!request}
            title="Login with Facebook"
            onPress={() => {
              promptAsync();}}
          />
        );
      }


  return (
    <AuthContext.Provider value={{
        user,
        loading,
        error,
        logout,
        signInWithGoogle,
        facebookSignIn,
    }}>
      {!loadingIntial && children}
    </AuthContext.Provider>
    
  )
}

export default function useAuth(){
    return useContext(AuthContext);
}