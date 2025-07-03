import { BottomSheetModal } from '@gorhom/bottom-sheet'
import BottomSheet from '@/components/BottomSheet'
import Colors from '@/constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Link } from 'expo-router'
import React, { useRef } from 'react'
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const SearchBar = () => (
    <View style={styles.searchBar}>
        <View style={styles.searchSection}>
            <View style={styles.searchField}>
                <Ionicons name="search-outline" size={20} style={styles.searchIcon} color={Colors.medium} />
                <TextInput style={styles.searchInput} placeholderTextColor={Colors.medium}  placeholder='Restaurants, groceries, dishes'/>
            </View>
            <Link href="/(modal)/filter" asChild>
                <TouchableOpacity style={styles.optionButton}>
                    <Ionicons name="options-outline" size={20} color={Colors.primary} />
                </TouchableOpacity>
            </Link>
        </View>
    </View>
)

const CustomHeader = () => {
    const bottomSheetRef = useRef<BottomSheetModal>(null); // <-- FIXED TYPE
    const handlePresentModalPress = () => {
        bottomSheetRef.current?.present();
    }
    return (
        <SafeAreaView style={styles.safeArea}>
            <BottomSheet ref={bottomSheetRef} />
            <View style={styles.container}>
                <TouchableOpacity onPress={handlePresentModalPress}>
                    <Image style={styles.bike} source={require('@/assets/images/bike.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePresentModalPress} style={styles.titleContainer}>
                    <Text style={styles.title}>Delivery - Now</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.subtitle}>Tbilisi</Text>
                        <Ionicons name="chevron-down" size={20} color={Colors.primary} style={{ marginLeft: 5 }} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileButton}>
                    <Ionicons name="person-outline" size={20} color={Colors.primary} />
                </TouchableOpacity>
            </View>  
            <SearchBar /> 
        </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff'
    },
    container: {
        height: 60,
        backgroundColor: '#fff',
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    bike: {
        height: 30,
        width: 30,
    },
    titleContainer: {
        flex: 1,
    },
    title: {
        fontSize: 14,
        color: Colors.medium
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',    
    },
    profileButton: {
        backgroundColor: Colors.lightGrey,
        padding: 10,
        borderRadius: 50,
    },
    searchBar: {
        height: 60,
        backgroundColor: '#fff'
    },
    searchSection: {
        flexDirection: 'row',
        gap: 10,
        flex: 1,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    searchField: {
        flex: 1,
        backgroundColor: Colors.lightGrey,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchIcon: {
        paddingLeft: 10,
    },
    searchInput: {
        padding: 10,
        color: Colors.medium,
    },
    optionButton: {
        padding: 10,
        borderRadius: 50,
    }
})
export default CustomHeader