import { useContext, useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { router } from "expo-router";
import { DroppedMarkerContext } from "@/contexts/DroppedMarkerContext";
import GooglePlacesMiniInput from "./google-places-mini-component";
import { Button } from "@/components/Button";

type ChooseNewCampsiteLocationProps = {
  setFormStep: (step: number) => void;
  newCampsiteAddress: any;
  setNewCampsiteData: (data: any) => void;
};

export default function ChooseNewCampsiteLocation({
  setFormStep,
  newCampsiteAddress,
  setNewCampsiteData,
}: ChooseNewCampsiteLocationProps) {
  const { droppedMarker, setDroppedMarker } = useContext(DroppedMarkerContext);

  function handleSubmitLocation() {
    setNewCampsiteData({
      campsite_latitude: droppedMarker?.latitude,
      campsite_longitude: droppedMarker?.longitude,
    });
    setFormStep(2);
  }

  return (
    <View style={styles.formContainer}>
      <Text style={styles.h2}>Step 1 - Choose a location: </Text>
      {!droppedMarker ? (
        <>
          <Button
            title={"Drop a pin"}
            onPress={() => {
              router.push("/(drawer)/(tabs)/search/map");
            }}
          />
          <Text style={styles.h2Italic}>
            or find an address in the search bar:{" "}
          </Text>
          <GooglePlacesMiniInput setRegion={setDroppedMarker} />
        </>
      ) : (
        <>
          <Text> {newCampsiteAddress}</Text>
          <Button
            title="Confirm location"
            onPress={() => handleSubmitLocation()}
          />
          <Button
            title="Choose a different location"
            onPress={() => setDroppedMarker(null)}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  h2: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  h2Italic: {
    fontStyle: "italic",
    fontSize: 16,
    marginBottom: 10,
  },
});
