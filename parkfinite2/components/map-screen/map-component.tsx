import MapView from "react-native-maps";
import { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import React, { useEffect } from "react";
import { StyleSheet, Image } from "react-native";

import { Campsite } from "@/types/campsite";
import { Region } from "@/types/locations";

import icon0 from "@/assets/images/campsite-icons/camping-icon.png"
import icon1 from "@/assets/images/campsite-icons/in-nature-icon.png";
import icon2 from "@/assets/images/campsite-icons/carpark-icon.png";
import icon3 from "@/assets/images/campsite-icons/carpark-day-only-icon.png";
import icon4 from "@/assets/images/campsite-icons/motorway-icon.png";
import icon5 from "@/assets/images/campsite-icons/motorhome-free-icon.png";
import icon6 from "@/assets/images/campsite-icons/motorhome-paid-icon.png";
import icon7 from "@/assets/images/campsite-icons/motorhome-private-icon.png";
import icon8 from "@/assets/images/campsite-icons/camping-icon.png";
import icon9 from "@/assets/images/campsite-icons/picnic-icon.png"
import icon10 from "@/assets/images/campsite-icons/beach-icon.png";

const INITIAL_REGION = {
  latitude: 55.0,
  longitude: -4.4,
  latitudeDelta: 11.0,
  longitudeDelta: 11.0,
};

const icons = {
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
            source={icons[campsite.category.category_id]}
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
