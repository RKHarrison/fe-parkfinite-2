import { useState } from "react";
import { StyleSheet, View, Platform, Text } from "react-native";

import { Region } from "@/types/locations";

import GooglePlacesInput from "@/components/map-drawer/map-tab/map-stack/map-stack-components/google-places-component";
import MapComponent from "@/components/map-drawer/map-tab/map-stack/map-component"

const initialRegion: Region = {
  latitude: 53.0,
  longitude: -4.4,
  latitudeDelta: 11.0,
  longitudeDelta: 11.0,
};

export default function MapScreen() {
  const [region, setRegion] = useState<Region>(initialRegion);

  return (
    <>
      {Platform.OS === "web" && (
        <Text
          style={{
            zIndex: 20000,
            position: "absolute",
            bottom: 35,
            left: 10,
            color: "red",
            fontWeight: 600,
          }}
        >
          WEB MODE IS IN BETA: some formatting and features might not work as
          expected
        </Text>
      )}
      <GooglePlacesInput setRegion={setRegion} />
      <MapComponent region={region} />
    </>
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
