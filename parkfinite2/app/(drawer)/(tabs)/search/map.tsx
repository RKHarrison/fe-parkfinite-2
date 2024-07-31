import React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import MapView from "react-native-maps";
import { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { getCampsites } from "@/services/api/campsitesApi";
import { Campsite } from "@/types/campsite";
import campsiteIcon from "@/assets/images/camping-location-icon.png";

const INITIAL_REGION = {
  latitude: 53.0,
  longitude: -4.4,
  latitudeDelta: 11.0,
  longitudeDelta: 11.0,
};

export default function Map() {
  const [loadedCampsites, setLoadedCampsites] = useState<Campsite[]>([]);

  useEffect(() => {
    Location.requestForegroundPermissionsAsync();
    getCampsites()
      .then((campsitesFromApi) => {
        return setLoadedCampsites(campsitesFromApi);
      })
      .catch((err) => console.error("Failed to load campsites", err));
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
      >
        {loadedCampsites.map((campsite, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: campsite.campsite_latitude,
              longitude: campsite.campsite_longitude,
            }}
          >
            <Image
              source={campsiteIcon}
              style={{ width: 30, height: 30 }}
              resizeMode="contain"
            />
          </Marker>
        ))}
      </MapView>
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
