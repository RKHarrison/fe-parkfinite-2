import { View } from "react-native";
import { StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { DroppedMarkerContext } from "@/contexts/DroppedMarkerContext";
import { getAddressFromCoordinate } from "@/services/api/googleMapsApi";

export default function ClearDroppedMarkerButton() {
  const { droppedMarker, setDroppedMarker } = useContext(DroppedMarkerContext);
  const [droppedMarkerAddress, setDroppedMarkerAddress] = useState(null);

  useEffect(() => {
    if (droppedMarker) {
      getAddressFromCoordinate(droppedMarker).then((address) => {
        setDroppedMarkerAddress(address);
      });
    }
  }, [droppedMarker]);

  return (
    <View style={styles.container}>
      <Button title="Clear marker" onPress={() => setDroppedMarker(null)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
    position: "absolute",
    left: 40,
    top: 60,
    borderRadius: 12,
    width: 110,
    height: 30,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
