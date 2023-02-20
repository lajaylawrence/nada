import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { ResponseType } from 'expo-auth-session';
import { getAuth, FacebookAuthProvider, signInWithCredential } from 'firebase/auth';
import { Button } from 'react-native';


WebBrowser.maybeCompleteAuthSession();

export default function facebookSignIn() {
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    responseType: ResponseType.Token,
    clientId: '6168234213219457',
    expoClientId: '6168234213219457'
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { access_token } = response.params;
      const auth = getAuth();
      const credential = FacebookAuthProvider.credential(access_token);
      // Sign in with the credential from the Facebook user.
      signInWithCredential(auth, credential);
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