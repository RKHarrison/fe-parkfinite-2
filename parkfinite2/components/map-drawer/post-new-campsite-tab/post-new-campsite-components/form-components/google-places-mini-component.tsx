import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import {
  GooglePlacesAutocomplete,
  GooglePlaceDetail,
} from "react-native-google-places-autocomplete";
import { DroppedMarkerContext } from "@/contexts/DroppedMarkerContext";
import { Region } from "@/types/locations";

interface GooglePlacesInputProps {
  setRegion: (region: Region) => void;
}

export default function GooglePlacesMiniInput({
  setRegion,
}: GooglePlacesInputProps) {
  const apikey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
  const { setDroppedMarker } = useContext(DroppedMarkerContext);

  function handlePress(details: GooglePlaceDetail) {
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
        details && handlePress(details);
      }}
      onFail={(error) => console.error(error)}
      requestUrl={{
        url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api",
        useOnPlatform: "web",
      }}
      styles={styles}
    />
  );
}
const styles = StyleSheet.create({
  textInputContainer: {
    backgroundColor: "rgba(0,0,0,0)",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    zIndex: 999,
    width: "90%",
  },
  textInput: {
    marginLeft: 0,
    marginRight: 0,
    height: 45,
    color: "#5d5d5d",
    fontSize: 16,
    borderWidth: 1,
    zIndex: 999,
  },
  predefinedPlacesDescription: {
    color: "#1faadb",
  },
  listView: {
    top: 45.5,
    zIndex: 10,
    position: "absolute",
    color: "black",
    backgroundColor: "white",
    width: "89%",
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: "blue",
  },
  description: {
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: 14,
    maxWidth: "89%",
  },
});
