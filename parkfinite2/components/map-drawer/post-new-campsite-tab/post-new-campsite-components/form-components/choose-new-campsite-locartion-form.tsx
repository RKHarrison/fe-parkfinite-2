import { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { router } from "expo-router";
import { DroppedMarkerContext } from "@/contexts/DroppedMarkerContext";
import GooglePlacesMiniInput from "./google-places-mini-component";
import { Button } from "@/components/Button";
import { FORM_STEPS } from "@/constants/postCampsiteFormSteps";

type ChooseNewCampsiteLocationProps = {
  setFormStep: (step: number) => void;
  newCampsiteAddress: string | null;
  setNewCampsiteData: (data: any) => void;
};

export default function ChooseNewCampsiteLocation({
  setFormStep,
  newCampsiteAddress,
  setNewCampsiteData,
}: ChooseNewCampsiteLocationProps) {
  const { droppedMarker, setDroppedMarker } = useContext(DroppedMarkerContext);

  function handleSubmitLocation() {
    setNewCampsiteData((previousCampsiteData: any) => ({
      ...previousCampsiteData,
      campsite_latitude: droppedMarker?.latitude,
      campsite_longitude: droppedMarker?.longitude,
    }));
    setFormStep(FORM_STEPS.basicInfo);
  }

  return (
    <View style={styles.formContainer}>
      <Text style={styles.h2}>Step 1 - Choose a location: </Text>
      {!droppedMarker || !newCampsiteAddress ? (
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
