import { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { DroppedMarkerContext } from "@/contexts/DroppedMarkerContext";
import NewCampsiteBasicInfoForm from "./post-new-campsite-components/new-campsite-basic-info-form";
import ChooseNewCampsiteLocation from "./post-new-campsite-components/choose-new-campsite-locartion-form";

export default function PostNewCampsiteScreen() {
  const { droppedMarker } = useContext(DroppedMarkerContext);

  return (
    <>
      <View style={styles.screenContainer}>
        <Text style={styles.h1}>Post a new campsite!</Text>
        <ChooseNewCampsiteLocation />

        {droppedMarker && (
          <View style={styles.formContainer}>
            <NewCampsiteBasicInfoForm />
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: "center",
  },
  h1: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 5,
  },
  h2: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  h2Italic: {
    fontStyle: "italic",
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  formContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 80,
  },
});
