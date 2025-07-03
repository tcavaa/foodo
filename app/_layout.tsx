import { useFonts } from 'expo-font';
import { Stack, router } from 'expo-router';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import { useColorScheme } from '@/hooks/useColorScheme';
import CustomHeader from '@/components/CustomHeader';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Colors from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from 'react-native'

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <BottomSheetModalProvider>
        <Stack>
          <Stack.Screen name="index" options={{
            header: () => <CustomHeader />,
          }} />
          <Stack.Screen name="(modal)/filter"
            options={{
              presentation: 'modal',
              headerTitle: 'Filter',
              headerShadowVisible: false,
              headerStyle: {
                backgroundColor: Colors.lightGrey,
              },
              headerLeft: () => (
                <TouchableOpacity onPress={() => {router.back()}}>
                  <Ionicons name="close-outline" size={23} color={Colors.primary} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen name="(modal)/location-search"
            options={{
              presentation: 'fullScreenModal',
              headerTitle: 'Select Location',
              headerLeft: () => (
                <TouchableOpacity onPress={() => {router.back()}}>
                  <Ionicons name="close-outline" size={23} color={Colors.primary} />
                </TouchableOpacity>
              ),
            }}
          />
        </Stack>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
