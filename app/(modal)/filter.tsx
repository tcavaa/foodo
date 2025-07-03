import { View, Text, StyleSheet, TouchableOpacity, FlatList, ListRenderItem } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import categories from '@/assets/data/filter.json';
import Ionicons from '@expo/vector-icons/Ionicons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface Category {
  name: string;
  count: number;
  checked?: boolean;
}

const ItemBox = () => (
    <>
    <View style={styles.itemContainer}>
      <TouchableOpacity style={styles.item}>
        <Ionicons name="arrow-down-outline" size={20} color={Colors.medium} />
        <Text style={{ flex: 1}}>Sort</Text>
        <Ionicons name="chevron-forward" size={22} color={Colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Ionicons name="fast-food-outline" size={20} color={Colors.medium} />
        <Text style={{ flex: 1}}>Hygiene rating</Text>
        <Ionicons name="chevron-forward" size={22} color={Colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Ionicons name="pricetag-outline" size={20} color={Colors.medium} />
        <Text style={{ flex: 1}}>Offers</Text>
        <Ionicons name="chevron-forward" size={22} color={Colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.item}>
        <Ionicons name="nutrition-outline" size={20} color={Colors.medium} />
        <Text style={{ flex: 1}}>Dietary</Text>
        <Ionicons name="chevron-forward" size={22} color={Colors.primary} />
      </TouchableOpacity>
    </View>
    <Text style={styles.header}>Categories</Text>
    </>
)
const filter = () => {
  const [items, setItems] = useState<Category[]>(categories);
  const [selected, setSelected] = useState<Category[]>([]);

  const flexWidth = useSharedValue(0);
  const scale = useSharedValue(0);

  useEffect(() => {
     const selectedItems = items.filter(item => item.checked);
    setSelected(selectedItems);

    // If there are any selected items, animate the button to a width of 150.
    // Otherwise, animate it back to 0.
    if (selectedItems.length > 0) {
      flexWidth.value = withTiming(150);
      scale.value = withTiming(1);
    } else {
      flexWidth.value = withTiming(0);
      scale.value = withTiming(0);
    }
  }, [items]);

  const handleClearAll = () => {
    const updatedItems = items.map((item) => {
      item.checked = false;
      return item;
    });
    setItems(updatedItems);
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: flexWidth.value,
      opacity: flexWidth.value > 0 ? 1 : 0,
    };
  });

  const animatedText = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const renderItem: ListRenderItem<Category> = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.itemText}>{item.name} ({item.count})</Text>
      <BouncyCheckbox
        fillColor={Colors.primary}
        unFillColor='#fff'
        useBuiltInState={false}
        isChecked={items[index].checked}
        onPress={() => {
            const isChecked = items[index].checked;
            const updatedItems = items.map((item) => {
              if(item.name === items[index].name) {
                item.checked = !isChecked;
              }
              return item;
            });
            setItems(updatedItems);
        }}
        iconStyle={{ borderColor: Colors.primary, borderRadius: 4 }}
        innerIconStyle={{ borderColor: Colors.primary, borderRadius: 4, borderWidth: 2}}
      />
    </View>
    
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        ListHeaderComponent={<ItemBox/>}
      />
      <View style={{ height: 80}}/>
    
      <View style={styles.footer}>
        <View style={styles.btnContainer}>
            <Animated.View style={[styles.outlineButton, animatedStyles]}>
                <TouchableOpacity onPress={handleClearAll}>
                    <Animated.Text style={[styles.outlineButtonText, animatedText]}>Clear all</Animated.Text>
                </TouchableOpacity>
            </Animated.View>
            <TouchableOpacity onPress={() => router.back()} style={styles.fullButton}>
                <Text style={styles.footerText}>Done</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.lightGrey,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: '#fff',
    padding: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {
        width: 0,
        height: -2,
    },
  },
  fullButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    alignItems: 'center',
    borderRadius: 8,
    height: 56,
    flex: 1,
  },
  footerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item:{
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    backgroundColor:'#fff',
    paddingVertical: 10,
    borderColor: Colors.grey,
    borderBottomWidth: 1,
    },
    row: {
    flexDirection: 'row',
    padding: 10,
    borderColor: '#fff',
    },
    itemText: {
        flex: 1,
    },
    btnContainer: {
        flexDirection: 'row',
        gap: 20,
        justifyContent: 'center',
    },
    outlineButton: {
        borderColor: Colors.primary,
        borderWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        height: 56,
    },
    outlineButtonText: {
        color: Colors.primary,
        fontWeight: 'bold',
        fontSize: 16,
    }
});


export default filter