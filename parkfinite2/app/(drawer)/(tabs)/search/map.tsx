import React from "react";
import { useEffect } from 'react';
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";

const INITIAL_REGION = {
  latitude: 53.00,
  longitude: -4.40,
  latitudeDelta: 11.0,
  longitudeDelta: 11.0,
}


export default function Map() {

  useEffect(() => {
    Location.requestForegroundPermissionsAsync();
  }, []);


  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        loadingEnabled={true}
        initialRegion={INITIAL_REGION}
        provider={PROVIDER_GOOGLE}
        followsUserLocation={true}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsTraffic={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
