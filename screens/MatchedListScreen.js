import { View, Text, SafeAreaView, StyleSheet} from 'react-native'
import React from 'react'
import Header from '../components/Header'
import MatchList from '../components/MatchList'


const MatchedListScreen = () => {
  return (
    <SafeAreaView>
      <Header title="Matches" />
      <MatchList/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container1: {
      padding: 2,
      flexDirection:"row",
      justifyContent:'space-between',
      alignItems: 'center',
  }
  
});

export default MatchedListScreen