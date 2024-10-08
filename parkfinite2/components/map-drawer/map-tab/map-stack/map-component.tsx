import React, { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, View, Text, Platform } from "react-native";
import MapView, {Marker, MapPressEvent} from "react-native-maps";
import { useIsFocused } from "@react-navigation/native";
import * as Location from "expo-location";

import { UserContext } from "@/contexts/UserContext";
import { DroppedMarkerContext } from "@/contexts/DroppedMarkerContext";
import { getCampsites } from "@/services/api/campsitesApi";
import { Campsite } from "@/types/api-data-types/campsite-types";
import { Region } from "@/types/locations";
import { CampsiteSummaryCard } from "./map-stack-components/campsite-summary-card";
import ClearDroppedMarkerButton from "./map-stack-components/clear-dropped-marker-button";
import PostNewCampsiteButton from "./map-stack-components/post-new-campsite-button";

let MapViewComponent: typeof MapView;
let MarkerComponent: typeof Marker;

if (Platform.OS === "web") {
  MapViewComponent = require("@preflower/react-native-web-maps").default;
  MarkerComponent = require("@preflower/react-native-web-maps").Marker;
} else if (Platform.OS === "android" || Platform.OS === "ios") {
  MapViewComponent = require("react-native-map-clustering").default;
  MarkerComponent = Marker
}

type IconKey = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

const icons: Record<IconKey, any> = {
  1: Platform.OS === "web" ? "../../assets/images/campsite-icons/in-nature-icon-3030.png" : require("@/assets/images/campsite-icons/in-nature-icon.png"),
  2: Platform.OS === "web" ? "../../assets/images/campsite-icons/carpark-icon-3030.png" : require("@/assets/images/campsite-icons/carpark-icon.png"),
  3: Platform.OS === "web" ? "../../assets/images/campsite-icons/carpark-day-only-icon-3030.png" : require("@/assets/images/campsite-icons/carpark-day-only-icon.png"),
  4: Platform.OS === "web" ? "../../assets/images/campsite-icons/motorway-icon-3030.png" : require("@/assets/images/campsite-icons/motorway-icon.png"),
  5: Platform.OS === "web" ? "../../assets/images/campsite-icons/motorhome-free-icon-3030.png" : require("@/assets/images/campsite-icons/motorhome-free-icon.png"),
  6: Platform.OS === "web" ? "../../assets/images/campsite-icons/motorhome-paid-icon-3030.png" : require("@/assets/images/campsite-icons/motorhome-paid-icon.png"),
  7: Platform.OS === "web" ? "../../assets/images/campsite-icons/motorhome-private-icon-3030.png" : require("@/assets/images/campsite-icons/motorhome-private-icon.png"),
  8: Platform.OS === "web" ? "../../assets/images/campsite-icons/camping-icon-3030.png" : require("@/assets/images/campsite-icons/camping-icon.png"),
  9: Platform.OS === "web" ? "../../assets/images/campsite-icons/picnic-icon-3030.png" : require("@/assets/images/campsite-icons/picnic-icon.png"),
  10: Platform.OS === "web" ? "../../assets/images/campsite-icons/beach-icon-3030.png" : require("@/assets/images/campsite-icons/beach-icon.png"),
}

type MapScreenProps = {
  region: Region;
};

export default function MapComponent({ region }: MapScreenProps) {
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

  function handleMapPress(e: MapPressEvent) {
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
      <MapViewComponent
        style={styles.map}
        onPress={handleMapPress}
        loadingEnabled={true}
        initialRegion={region}
        region={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
        followsUserLocation={true}
        showsTraffic={false}
        // Conditionally add clustering props for non-web platforms
        {...(Platform.OS !== "web" && {
          clusterColor: "#88c9ffBF",
          minPoints: 6,
        })} 
      >

        {loadedCampsites.map((campsite) => (
          <MarkerComponent
            key={campsite.campsite_id}
            onPress={() => setSelectedCampsite(campsite)}
            coordinate={{
              latitude: campsite.campsite_latitude,
              longitude: campsite.campsite_longitude,
            }}
            title={campsite.campsite_name}
            description={campsite.category.category_name}
            icon={Platform.OS === 'web' && icons[campsite.category.category_id as IconKey]}

          >
            {Platform.OS !== "web" && (
              <Image
                source={icons[campsite.category.category_id as IconKey]}
                style={{ width: 30, height: 30 }}
                resizeMode="contain"
              />
            )}
          </MarkerComponent>
        ))}

        {droppedMarker && (
          <MarkerComponent
            coordinate={droppedMarker}
            draggable
            onDragEnd={(e) => setDroppedMarker(e.nativeEvent.coordinate)}
            isPreselected
          />
        )}
      </MapViewComponent>
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
function loadGoogleMapsAPI(callback: () => void) {
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
