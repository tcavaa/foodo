import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import "react-native-get-random-values";
import Mapview from 'react-native-maps'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';

// {process.env.EXPO_PUBLIC_GOOGLE_API_KEY}

const LocationSearch = () => {
  const [location, setLocation] = useState({
    latitude: 41.727607,
    longitude: 44.766024,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });

  return (
    <View style={{ flex: 1 }}>
        <GooglePlacesAutocomplete
            placeholder="Search"
            query={{
                key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY, // Replace with your actual API key
                language: 'en',
                types: 'geocode',
            }}
            autoFillOnNotFound={false}
            currentLocation={false}
            currentLocationLabel="Current location"
            debounce={0}
            disableScroll={false}
            enableHighAccuracyLocation={true}
            enablePoweredByContainer={true}
            fetchDetails={true}
            filterReverseGeocodingByTypes={[]}
            GooglePlacesDetailsQuery={{}}
            GooglePlacesSearchQuery={{
                rankby: 'distance',
                type: 'restaurant',
            }}
            GoogleReverseGeocodingQuery={{}}
            isRowScrollable={true}
            keyboardShouldPersistTaps="always"
            listUnderlayColor="#c8c7cc"
            listViewDisplayed="auto"
            keepResultsAfterBlur={false}
            minLength={1}
            nearbyPlacesAPI="GooglePlacesSearch"
            numberOfLines={1}
            onFail={() => {
                console.warn('Autocomplete failed');
            }}
            onNotFound={() => {
                console.log('No results found');
            }}
            onPress={(data, details) => {
                const point = details?.geometry?.location
                if(!point) return;
                setLocation({
                    ...location,
                    latitude: point.lat,
                    longitude: point.lng
                })
            }}
            onTimeout={() =>
                console.warn('Google Places Autocomplete: Request timeout')
            }
            predefinedPlaces={[]}
            predefinedPlacesAlwaysVisible={false}
            styles={{
                container: {
                    flex: 0,
                    backgroundColor: Colors.light,
                    padding: 4,
                    
                }
            }} // Customize styles if needed
            suppressDefaultStyles={false}
            textInputHide={false}
            textInputProps={{placeholderTextColor: Colors.medium}}
            timeout={2000}
            />
            
      <Mapview style={styles.map} showsUserLocation={true} region={location} />

      <View style={styles.absoluteBox}>
        <TouchableOpacity style={styles.button} onPress={() => {router.back()}}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  absoluteBox: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    margin: 16,
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }
})

export default LocationSearch