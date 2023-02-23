import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './StackNavigation';
import {NavigationContainer} from "@react-navigation/native"
import { AuthProvider } from './hooks/useAuth';

export default function App() {
  return (
    <NavigationContainer> 
      <AuthProvider>
         <StackNavigator /> 

      </AuthProvider>
       

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

