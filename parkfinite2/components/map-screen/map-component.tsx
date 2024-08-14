import { getCampsites } from "@/services/api/campsitesApi";
import { Campsite } from "@/types/api-data-types/campsite-types";
import { Region } from "@/types/locations";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import MapView from "react-native-map-clustering";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import { Collapsible } from "../Collapsible";
import { CampsiteSummaryCard } from "./campsite-summary-card";

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

export default function MapComponent({ region }: { region: Region }) {
  const [loadedCampsites, setLoadedCampsites] = useState<Campsite[]>([]);
  const [selectedCampsite, setSelectedCampsite] = useState<Campsite | null>(
    null
  );

  useEffect(() => {
    Location.requestForegroundPermissionsAsync();
    getCampsites()
      .then((campsitesFromApi) => setLoadedCampsites(campsitesFromApi))
      .catch((err) => console.error("Failed to load campsites", err));
  }, []);

  return (
    <>
      {selectedCampsite && (
        <CampsiteSummaryCard selectedCampsite={selectedCampsite} />
      )}
      <MapView
        style={styles.map}
        onPress={() => setSelectedCampsite(null)}
        provider={PROVIDER_GOOGLE}
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
        {loadedCampsites.map((campsite, index) => (
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
