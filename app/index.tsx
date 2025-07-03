import { View, ScrollView, Text, StyleSheet } from 'react-native'
import React from 'react'
import Categories from '@/components/Categories'
import Restaurants from '@/components/Restaurants'
import Colors from '@/constants/Colors'

const index = () => {
  return ( 
    <View style={styles.container}>
      <ScrollView>
        <Categories/>
        <Text style={styles.header}>Top picks in your neighbourhood</Text>
        <Restaurants/>
        <Text style={styles.header}>Offers near you</Text>
        <Restaurants/>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    top: 175,
    backgroundColor: Colors.lightGrey
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingHorizontal: 16
  }
})

export default index