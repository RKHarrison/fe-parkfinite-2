import React from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Region } from "@/types/locations";

import GooglePlacesInput from "@/components/map-drawer/map-tab/map-stack/map-stack-components/google-places-component";
import MapComponent from "@/components/map-drawer/map-tab/map-stack/map-stack";

const initialRegion: Region = {
  latitude: 53.0,
  longitude: -4.4,
  latitudeDelta: 11.0,
  longitudeDelta: 11.0,
};

export default function Map() {
  const [region, setRegion] = useState<Region>(initialRegion);

  return (
    <View style={styles.container}>
      <GooglePlacesInput setRegion={setRegion} />
      <MapComponent region={region} />
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
