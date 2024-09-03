import { useContext, useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { router } from "expo-router";
import { DroppedMarkerContext } from "@/contexts/DroppedMarkerContext";
import { getAddressFromCoordinate } from "@/services/api/googleMapsApi";
import GooglePlacesMiniInput from "../post-new-campsite-components/google-places-mini-component";
import { Button } from "@/components/Button";

export default function ChooseNewCampsiteLocation() {
  const { droppedMarker, setDroppedMarker } = useContext(DroppedMarkerContext);
  const [newCampsiteAddress, setNewCampsiteAddress] = useState(null);

  useEffect(() => {
    if (droppedMarker) {
      getAddressFromCoordinate(droppedMarker).then((res) => {
        setNewCampsiteAddress(res);
      });
    }
  }, [droppedMarker]);

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
