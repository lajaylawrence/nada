import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './StackNavigation';
import {NavigationContainer} from "@react-navigation/native"
import { AuthenticationProvider } from './hooks/auth';

export default function App() {
  return (
    <NavigationContainer> 
      <AuthenticationProvider>
      <StackNavigator /> 
      </AuthenticationProvider>
      
    </NavigationContainer>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
