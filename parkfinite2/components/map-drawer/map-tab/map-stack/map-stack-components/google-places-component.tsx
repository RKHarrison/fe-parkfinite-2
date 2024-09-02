import React, { useContext } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { StyleSheet } from "react-native";
import { Region } from "@/types/locations";
import { DroppedMarkerContext } from "@/contexts/DroppedMarkerContext";

interface GooglePlacesInputProps {
  setRegion: (region: Region) => void;
}

export default function GooglePlacesInput({
  setRegion,
}: GooglePlacesInputProps) {
  const apikey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
  const { setDroppedMarker } = useContext(DroppedMarkerContext);

  function handlePress(details) {
    setDroppedMarker({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
    });
    setRegion({
      latitude: details.geometry.location.lat,
      longitude: details.geometry.location.lng,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });
  }

  return (
    <GooglePlacesAutocomplete
      query={{
        key: apikey,
        language: "en",
      }}
      placeholder="Search"
      fetchDetails={true}
      onPress={(data, details = null) => {
        handlePress(details, data);
      }}
      onFail={(error) => console.error(error)}
      requestUrl={{
        url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api",
        useOnPlatform: "web",
      }}
      styles={styles.input}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    container: {
      position: "absolute",
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
      backgroundColor: "#FFFFFF",
      padding: 13,
      height: 44,
      flexDirection: "row",
    },
    description: {
      fontSize: 12,
    },
    separator: {
      height: 0.5,
      backgroundColor: "#c8c7cc",
    },
  },
});
