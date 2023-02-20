import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { Button } from 'react-native';

// Initialize Firebase
initializeApp({
    apiKey: "AIzaSyCoe72s9wAZoQLMDWXPtp61zccvRaOdovg",
    authDomain: "nada-c55d3.firebaseapp.com",
    databaseURL: "https://nada-c55d3-default-rtdb.firebaseio.com",
    projectId: "nada-c55d3",
    storageBucket: "nada-c55d3.appspot.com",
    messagingSenderId: "263793207130",
    appId: "1:263793207130:web:16fd622a0214db03037563",
    measurementId: "G-DZWJTJEJHM"
});

WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignIn() {

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      androidClientId: "263793207130-msocdf6sal7l1d4seqkq61khhtk5oqt9.apps.googleusercontent.com",
      iosClientId: "263793207130-reqapsjgtdh8465p86gef4boat9scqvv.apps.googleusercontent.com",
      expoClientId: "263793207130-3hi3ev4qkmd3b7tjlugr0b53hapefd9k.apps.googleusercontent.com"
    },
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
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

