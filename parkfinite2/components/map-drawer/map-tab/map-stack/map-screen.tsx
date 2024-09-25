import React, { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, View, Text, Platform } from "react-native";

import * as Location from "expo-location";
import { useIsFocused } from "@react-navigation/native";

import { UserContext } from "@/contexts/UserContext";
import { DroppedMarkerContext } from "@/contexts/DroppedMarkerContext";
import { getCampsites } from "@/services/api/campsitesApi";
import { Campsite } from "@/types/api-data-types/campsite-types";
import { Region } from "@/types/locations";
import { CampsiteSummaryCard } from "./map-stack-components/campsite-summary-card";
import ClearDroppedMarkerButton from "./map-stack-components/clear-dropped-marker-button";
import PostNewCampsiteButton from "./map-stack-components/post-new-campsite-button";

import icon10 from "@/assets/images/campsite-icons/beach-icon.png";
import icon8 from "@/assets/images/campsite-icons/camping-icon.png";
import icon3 from "@/assets/images/campsite-icons/carpark-day-only-icon.png";
import icon2 from "@/assets/images/campsite-icons/carpark-icon.png";
import icon1 from "@/assets/images/campsite-icons/in-nature-icon.png";
import icon5 from "@/assets/images/campsite-icons/motorhome-free-icon.png";
import icon6 from "@/assets/images/campsite-icons/motorhome-paid-icon.png";
import icon7 from "@/assets/images/campsite-icons/motorhome-private-icon.png";
import icon4 from "@/assets/images/campsite-icons/motorway-icon.png";
import icon9 from "@/assets/images/campsite-icons/picnic-icon.png";

let MapView, Marker;
if (Platform.OS === "web") {
  MapView = require("@preflower/react-native-web-maps").default;
  Marker = require("@preflower/react-native-web-maps").Marker;
} else if (Platform.OS === "android" || Platform.OS === "ios") {
  MapView = require("react-native-map-clustering").default;
  Marker = require("react-native-maps").Marker;
}

type IconKey = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

const icons: Record<IconKey, any> = {
  1: icon1,
  2: icon2,
  3: icon3,
  4: icon4,
  5: icon5,
  6: icon6,
  7: icon7,
  8: icon8,
  9: icon9,
  10: icon10,
};

type MapScreenProps = {
  region: Region;
};

export default function MapScreen({ region }: MapScreenProps) {
  const { user } = useContext(UserContext);
  const { droppedMarker, setDroppedMarker } = useContext(DroppedMarkerContext);
  const [loadedCampsites, setLoadedCampsites] = useState<Campsite[]>([]);
  const [selectedCampsite, setSelectedCampsite] = useState<Campsite | null>(
    null
  );
  const isFocused = useIsFocused();

  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);

  useEffect(() => {
    if (Platform.OS === "web") {
      loadGoogleMapsAPI(() => {
        setGoogleMapsLoaded(true);
      });
    } else {
      setGoogleMapsLoaded(true);
    }
  }, []);

  useEffect(() => {
    Location.requestForegroundPermissionsAsync();
    getCampsites()
      .then((campsitesFromApi) => setLoadedCampsites(campsitesFromApi))
      .catch((err) => console.error("Failed to load campsites", err));
  }, [isFocused]);

  function handleMapPress(e) {
    const { coordinate } = e.nativeEvent;
    user && setDroppedMarker(coordinate);
    setSelectedCampsite(null);
  }

  if (!googleMapsLoaded) {
    return <Text>LOADING....</Text>;
  }

  return (
    <>
      {selectedCampsite && (
        <CampsiteSummaryCard selectedCampsite={selectedCampsite} />
      )}
      {droppedMarker && <ClearDroppedMarkerButton />}
      {droppedMarker && <PostNewCampsiteButton />}
      <MapView
        style={styles.map}
        onPress={handleMapPress}
        loadingEnabled={true}
        initialRegion={region}
        region={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={true}
        showsTraffic={false}
        // cluster controls
        clusterColor="#88c9ffBF"
        minPoints={6}
      >
        {loadedCampsites.map((campsite) => (
          <Marker
            key={campsite.campsite_id}
            onPress={() => setSelectedCampsite(campsite)}
            coordinate={{
              latitude: campsite.campsite_latitude,
              longitude: campsite.campsite_longitude,
            }}
            title={campsite.campsite_name}
            description={campsite.category.category_name}
          >
            <Image
              source={icons[campsite.category.category_id as IconKey]}
              style={{ width: 30, height: 30 }}
              resizeMode="contain"
            />
          </Marker>
        ))}

        {droppedMarker && (
          <Marker
            coordinate={droppedMarker}
            draggable
            onDragEnd={(e) => setDroppedMarker(e.nativeEvent.coordinate)}
            isPreselected
          />
        )}
      </MapView>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
});

// Function to load Google Maps API
function loadGoogleMapsAPI(callback) {
  if (window.google && window.google.maps) {
    // Google Maps API is already loaded, call the callback function
    callback();
  } else {
    const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
    // Google Maps API is not loaded, dynamically load it
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry`;
    script.async = true;
    script.defer = true;
    script.onload = callback;

    // Append the script to the document
    document.head.appendChild(script);
  }
}
