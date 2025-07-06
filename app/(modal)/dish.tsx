import { getDishById } from '@/assets/data/restaurant'
import { useLocalSearchParams, router } from 'expo-router'
import React from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Colors from '@/constants/Colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated, { FadeInDown, FadeInLeft } from 'react-native-reanimated'
import * as Haptics from 'expo-haptics'
import useBasketStore from '@/store/basketStore'

const Dish = () => {
    const { id } = useLocalSearchParams()
    const item = getDishById(+id)!
    const { addProduct } = useBasketStore()

    const addToCart = () => {
        addProduct(item)
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
        router.back()
    }
  return (
    <SafeAreaView style={{ flex:1, backgroundColor: '#fff'}} edges={['bottom']}>
        <View style={styles.container}>
            <Animated.Image style={styles.image} entering={FadeInDown.duration(500).delay(200)} source={item?.img}/>
            <View style={{ padding: 20}}>
                <Animated.Text entering={FadeInLeft.duration(400).delay(200)} style={styles.itemName}>{item?.name}</Animated.Text>
                <Animated.Text entering={FadeInLeft.duration(400).delay(400)} style={styles.itemInfo}>{item?.info}</Animated.Text>
            </View>

            <View style={styles.footer}> 
                <TouchableOpacity style={styles.fullButton} onPress={addToCart}>
                    <Text style={styles.buttonText}>Add for {item?.price}</Text>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    image: {
        width: '100%',
        height: 300,
    },
    itemName: {
        fontSize: 24, 
        fontWeight: 'bold', 
        marginBottom: 8
    },
    itemInfo: {
        fontSize: 16,
        color: Colors.mediumDark
    },
    footer: {
        position: 'absolute',
        backgroundColor: '#fff',
        bottom: 0,
        left: 0,
        width: '100%',
        padding: 10,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -10},
        shadowOpacity: 0.1,
        shadowRadius: 10,
        paddingTop: 20,
    },
    fullButton: {
        backgroundColor: Colors.primary,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center'
    },
    buttonText: {
        color: "#fff",
        fontWeight: 'bold',
        fontSize: 16
    }
})

export default Dish