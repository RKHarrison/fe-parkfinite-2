import MapView from "react-native-maps";
import { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import React, { useEffect } from "react";
import { StyleSheet, Image } from "react-native";

import { Campsite } from "@/types/campsite";
import { Region } from "@/types/locations";

import campsiteIcon from "@/assets/images/camping-location-icon.png";

const INITIAL_REGION = {
  latitude: 55.0,
  longitude: -4.4,
  latitudeDelta: 11.0,
  longitudeDelta: 11.0,
};

export default function MapComponent(
  { loadedCampsites, region }: { loadedCampsites: Campsite[], region: Region },
) {

  useEffect(()=>{
    console.log(region);  
  },[region])

  return (
    <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      loadingEnabled={true}
      initialRegion={INITIAL_REGION}
      region={region}
      showsUserLocation={true}
      showsMyLocationButton={true}
      followsUserLocation={true}
      showsTraffic={false}
    >
      {loadedCampsites.map((campsite, index) => (
        <Marker
          key={campsite.campsite_id}
          coordinate={{
            latitude: campsite.campsite_latitude,
            longitude: campsite.campsite_longitude,
          }}
          title={campsite.campsite_name}
          description={campsite.category.category_name}
        >
          <Image
            source={campsiteIcon}
            style={{ width: 30, height: 30 }}
            resizeMode="contain"
          />
        </Marker>
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
});
