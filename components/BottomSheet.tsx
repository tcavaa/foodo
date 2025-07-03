import { Text, View, TouchableOpacity, StyleSheet, } from 'react-native'
import { Link } from 'expo-router'
import { BottomSheetBackdrop, BottomSheetModal,BottomSheetView, useBottomSheetModal } from '@gorhom/bottom-sheet'
import React, { forwardRef, useMemo, useCallback } from 'react'
import Colors from '@/constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons'

export type Ref = BottomSheetModal

const BottomSheet = forwardRef<Ref>((props, ref) => {
    const snapPoints = useMemo(() => ["50%"], []);
    const renderBackdrop = useCallback((props:any) => <BottomSheetBackdrop appearsOnIndex={1} disappearsOnIndex={-1} {...props} />, []);
    const { dismiss } = useBottomSheetModal();
  return (
    <BottomSheetModal 
        backgroundStyle={{ backgroundColor: Colors.lightGrey, borderRadius: 0 }}
        index={1} 
        ref={ref} 
        snapPoints={snapPoints}
        overDragResistanceFactor={0.5}
        backdropComponent={renderBackdrop}
    >
        <BottomSheetView style={styles.contentContainer}>
            <View style={styles.toggle}>
                <TouchableOpacity style={styles.toggleActive}>
                    <Text style={styles.activeText}>Delivery</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.toggleInactive}>
                    <Text style={styles.inactiveText}>Pick up</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.subHeader}>Your Location</Text>
            <Link href="/(modal)/location-search" asChild>
                <TouchableOpacity>
                    <View style={styles.item}>
                        <Ionicons name="location-outline" size={20} color={Colors.medium} />
                        <Text style={{ flex: 1}}>Current Location</Text>
                        <Ionicons name="chevron-forward-outline" size={20} color={Colors.primary} />
                    </View>
                </TouchableOpacity>
            </Link> 
            <Text style={styles.subHeader}>Arrival time</Text>
            <TouchableOpacity>
                <View style={styles.item}>
                    <Ionicons name="stopwatch-outline" size={20} color={Colors.medium} />
                    <Text style={{ flex: 1}}>Now</Text>
                    <Ionicons name="chevron-forward-outline" size={20} color={Colors.primary} />
                </View>
            </TouchableOpacity>


            <TouchableOpacity style={styles.button} onPress={() => dismiss()}>
                <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
        </BottomSheetView>
    </BottomSheetModal>
  )
})

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
    },
    toggle: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        marginTop: 10,
        marginBottom: 32,
    },
    toggleActive: {
        backgroundColor: Colors.primary,
        padding: 8,
        borderRadius: 32,
        paddingHorizontal: 32,
    },
    activeText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    toggleInactive: {
        padding: 8,
        borderRadius: 32,
        paddingHorizontal: 32,
    },
    inactiveText: {
        color: Colors.primary,
        fontWeight: 'bold',
    },
    subHeader: {
        fontSize: 16,
        fontWeight: '600',
        margin: 16,
    },
    button: {
        backgroundColor: Colors.primary,
        borderRadius: 4,
        padding: 16,
        alignItems: 'center',
        margin: 16,
    },
    buttonText: {
        color:'#fff',
        fontWeight: 'bold',
    },
    item:{
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        backgroundColor:'#fff',
        padding: 16,
        borderColor: Colors.grey,
        borderWidth: 1,
    }
})

export default BottomSheet