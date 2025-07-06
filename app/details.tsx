import { View, Text, StyleSheet,Image, TouchableOpacity, SectionList, ListRenderItem } from 'react-native'
import React, { useLayoutEffect, useState, useRef } from 'react'
import { useNavigation, router, Link } from 'expo-router'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import ParralaxScrollView from '@/components/ParralaxScrollView'
import Colors from '@/constants/Colors'
import { restaurant } from '@/assets/data/restaurant'
import Ionicons from '@expo/vector-icons/Ionicons'
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context'
import useBasketStore from '@/store/basketStore';

const Details = () => {
    const navigation = useNavigation();
    const [activeIndex, setActiveIndex] = useState(0)

    const opacity = useSharedValue(0)
    const animatedStyles = useAnimatedStyle(() => ({
        opacity: opacity.value
    }))
    
    const scrollRef = useRef<ScrollView>(null)
    const itemsRef = useRef<Array<any | null>>([])

    const DATA = restaurant.food.map((item, index) => ({
        title: item.category,
        data: item.meals,
        index
    }))

    const { items, total } = useBasketStore()

  useLayoutEffect(() => { 
    navigation.setOptions({
        headerTransparent: true,
        headerTitle: '',
        headerTintColor: Colors.primary,
        headerLeft: () => (
            <TouchableOpacity style={styles.roundButton} onPress={() => router.back()}>
                <Ionicons name='arrow-back' color={Colors.primary} size={24}/>
            </TouchableOpacity>
        ),
        headerRight: () => (
            <View style={styles.bar}>
                <TouchableOpacity style={styles.roundButton}>
                    <Ionicons name='share-outline' color={Colors.primary} size={24}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.roundButton}>
                    <Ionicons name='search-outline' color={Colors.primary} size={24}/>
                </TouchableOpacity>
            </View>
        )
    })
  }, [navigation])

  const selectCategory = (index: number) => {
    const selected = itemsRef.current[index]
    setActiveIndex(index)

    selected.measure((x: number, y: number) => {
        scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true})
    })
  }

  const onScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y
    if (y > 350) {
        opacity.value = withTiming(1)
    } else {
        opacity.value = withTiming(0)
    }
  }

  const renderItem: ListRenderItem<any> = ({ item, index}) => (
    <Link href={{pathname: '/(modal)/dish', params: {id: item.id}}} asChild>
        <TouchableOpacity style={styles.renderItem}>
            <View style={{ flex: 1}}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemInfo}>{item.info}</Text>
                <Text style={styles.itemInfo}>${item.price}</Text>
            </View>
            <Image source={item.img} style={styles.img}/>
        </TouchableOpacity>
    </Link>
  )

  return (
    <>
      <ParralaxScrollView 
        scrollEvent={onScroll}
        style={{ flex:1 }}
        backgroundColor={'#fff'}
        parallaxHeaderHeight={250}
        stickyHeaderHeight={100}
        contentBackgroundColor={Colors.lightGrey}
        renderBackground={() => <Image source={restaurant.img} style={{width:'100%', height: 300}} />}
        renderStickyHeader={() => (
            <View key="sticky-header" style={styles.stickySection}>
                <Text style={styles.stickySectionText}>{restaurant.name}</Text>
            </View>
        )}
       >
        <View style={styles.detailsContainer}>
            <Text style={styles.restaurantName}>{restaurant.name}</Text>
            <Text style={styles.restaurantDesc}>
                {restaurant.delivery} • {restaurant.tags.map((tag, index) => 
                    `${tag}${index < restaurant.tags.length - 1 ? ' • ' : ''}`)
                }
            </Text>
            <Text style={styles.restaurantDesc}>{restaurant.about}</Text>
            <SectionList 
                contentContainerStyle={{ paddingBottom: 50}}
                scrollEnabled={false} 
                keyExtractor={(item, index) => `${item.id + index}`}
                sections={DATA} 
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: Colors.grey}} />}
                SectionSeparatorComponent={() => <View style={{ height: 1, backgroundColor: Colors.grey}} />}
                renderSectionHeader={({ section: { title, index} }) => 
                    <Text style={styles.sectionHeader}>{title}</Text>
                }
                />
        </View>
      </ParralaxScrollView>

      <Animated.View style={[styles.stickySegments, animatedStyles]}>
        <View style={styles.segmentShadow}>
            <ScrollView
                ref={scrollRef} 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.segmentScrollView}>
            
                {restaurant.food.map((item, index) => (
                    <TouchableOpacity 
                        key={index} 
                        ref={(ref) => { itemsRef.current[index] = ref!; }}
                        style={activeIndex === index ? styles.segmentButtonActive : styles.segmentButton}
                        onPress={() => selectCategory(index)}
                    >
                        <Text style={activeIndex === index ? styles.segmentTextActive : styles.segmentText}>{item.category}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
      </Animated.View>

      {items > 0 && (
        <View style={styles.footer}>
            <SafeAreaView edges={['bottom']} style={{ backgroundColor: '#fff'}}>
                <Link href="/basket" asChild>
                    <TouchableOpacity style={styles.fullButton}>
                        <Text style={styles.basket}>{items}</Text>
                        <Text style={styles.footerText}>View basket</Text>
                        <Text style={styles.basketTotal}>${total}</Text>
                    </TouchableOpacity>
                </Link> 
            </SafeAreaView>
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
    detailsContainer: {
        backgroundColor: Colors.lightGrey,
    },
    stickySection: {
        backgroundColor: '#fff',
        marginLeft: 70,
        height: 100,
        justifyContent: 'flex-end'
    },
    stickySectionText: {
        fontSize: 20,
        margin: 10
    },
    roundButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    restaurantName: {
        fontSize: 30,
        margin: 16,
    },
    restaurantDesc: {
        fontSize: 16,
        margin: 16,
        lineHeight: 22,
        color: Colors.medium
    },
    sectionHeader: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 40,
        margin: 16,
    },
    renderItem: { 
        flexDirection: 'row', 
        backgroundColor: '#fff',
        padding: 16,
    },
    img: {
        height: 80,
        width: 80,
        borderRadius: 4,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemInfo: {
        fontSize: 14,
        color: Colors.mediumDark,
        paddingVertical: 4,
    },
    stickySegments: {
        position: 'absolute',
        height: 50,
        left: 0,
        right:0,
        top: 100,
        backgroundColor: "#fff",
        overflow: 'hidden',
        paddingBottom: 4,
    },
    segmentShadow: {
        backgroundColor:'#fff',
        justifyContent:'center',
        paddingTop: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        width: '100%',
        height: '100%',
    },
    segmentButton: {
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 50,

    },
    segmentButtonActive: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderRadius: 50
    },
    segmentText: {
        color: Colors.primary,
        fontSize: 16,
    },
    segmentTextActive: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    segmentScrollView: {
        paddingHorizontal: 16,
        alignItems: 'center',
        gap: 20,
        paddingBottom: 4,
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
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        height: 50
    },
    footerText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff'
    },
    basket: {
        color: "#fff",
        backgroundColor: '#19AA86',
        padding: 8,
        borderRadius: 2,
        fontWeight: 'bold'
    },
    basketTotal: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
})

export default Details