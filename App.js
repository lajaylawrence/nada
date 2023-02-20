import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './StackNavigation';
import {NavigationContainer} from "@react-navigation/native"

export default function App() {
  return (
    <NavigationContainer> 
   
      <StackNavigator /> 

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

