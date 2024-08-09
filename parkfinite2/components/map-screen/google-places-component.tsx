import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { StyleSheet } from 'react-native';


export default function GooglePlacesInput ({setRegion}) {
  const apikey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY

  return (
    <GooglePlacesAutocomplete
    query={{
      key: apikey,
      language: "en",
    }}

    placeholder="Search"
    fetchDetails={true}
    onPress={(data, details = null) => {
      details && setRegion(
        {
          latitude: details.geometry.location.lat,
          longitude: details.geometry.location.lng,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }
      )
    }}
    onFail={(error) => console.error(error)}
    requestUrl={{
      url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api",
      useOnPlatform: "web",
    }}
    styles={styles.input}
  />
  );
};

const styles = StyleSheet.create({
  input: {
    container: {
      position: 'absolute',
      top: 10,
      left: 60,
      right: 60,
      zIndex: 2,
    },
    textInput: {
      height: 40,
      fontSize: 12,
    },
    listView: {
      backgroundColor: "white",
      zIndex: 3,
    },
    row: {
      backgroundColor: '#FFFFFF',
      padding: 13,
      height: 44,
      flexDirection: 'row',
    },
    description: {
      fontSize: 12,
    },
    separator: {
      height: 0.5,
      backgroundColor: '#c8c7cc',
    },
  },
});
