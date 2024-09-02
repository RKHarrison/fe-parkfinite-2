import { View } from "react-native";
import { StyleSheet } from "react-native";
import { useContext } from "react";
import { Button } from "@/components/Button";
import { DroppedMarkerContext } from "@/contexts/DroppedMarkerContext";


export default function PostNewCampsiteButton() {
  const { droppedMarker, setDroppedMarker } = useContext(DroppedMarkerContext);

  return (
    <View style={styles.container}>
      <Button
        title="Create new campsite here"
        onPress={() => setDroppedMarker(droppedMarker)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
    position: "absolute",
    right: 40,
    top: 60,
    borderRadius: 12,
    width: 200,
    height: 30,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
