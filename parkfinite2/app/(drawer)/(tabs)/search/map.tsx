import React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, View, Image } from "react-native";

import * as Location from "expo-location";
import { getCampsites } from "@/services/api/campsitesApi";

import { Campsite } from "@/types/campsite";
import { Region } from "@/types/locations";

import GooglePlacesInput from "@/components/map-screen/google-places-component";
import MapComponent from "@/components/map-screen/map-component";

export default function Map() {
  const [region, setRegion] = useState<Region>({
    latitude: 53.0,
    longitude: -4.4,
    latitudeDelta: 11.0,
    longitudeDelta: 11.0,
  });
  const [loadedCampsites, setLoadedCampsites] = useState<Campsite[]>([]);

  useEffect(() => {
    Location.requestForegroundPermissionsAsync();
    getCampsites()
      .then((campsitesFromApi) => setLoadedCampsites(campsitesFromApi))
      .catch((err) => console.error("Failed to load campsites", err));
  }, []);

  return (
    <View style={styles.container}>
      <GooglePlacesInput setRegion={setRegion} />
      <MapComponent loadedCampsites={loadedCampsites} region={region} />
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
    zIndex: 1,
  },
});
