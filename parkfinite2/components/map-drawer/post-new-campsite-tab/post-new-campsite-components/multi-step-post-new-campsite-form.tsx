import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { DroppedMarkerContext } from "@/contexts/DroppedMarkerContext";
import { getAddressFromCoordinate } from "@/services/api/googleMapsApi";
import NewCampsiteBasicInfoForm from "./form-components/new-campsite-basic-info-form";
import ChooseNewCampsiteLocation from "./form-components/choose-new-campsite-locartion-form";
import { UserContext } from "@/contexts/UserContext";
import NewCampsiteContactsForm from "./form-components/new-campsite-contacts-form";
import ReviewAndSubmitNewCampsite from "./form-components/review-and-submit-page";

export default function MultiStepPostNewCampsiteForm() {
  const { droppedMarker, setDroppedMarker } = useContext(DroppedMarkerContext);
  const [newCampsiteAddress, setNewCampsiteAddress] = useState(null);
  const [formStep, setFormStep] = useState(1);
  const [newCampsiteData, setNewCampsiteData] = useState({});

  useEffect(() => {
    console.log(newCampsiteData);
  }, [newCampsiteData]);

  useEffect(() => {
    setFormStep(1);
    setNewCampsiteData({});
    if (droppedMarker) {
      getAddressFromCoordinate(droppedMarker).then((res) => {
        setNewCampsiteAddress(res);
      });
    }
  }, [droppedMarker]);

  return (
    <>
      <View style={styles.screenContainer}>
        <Text style={styles.h1}>Post a new campsite!</Text>
        {formStep === 1 && (
          <ChooseNewCampsiteLocation
            setFormStep={setFormStep}
            newCampsiteAddress={newCampsiteAddress}
            setNewCampsiteData={setNewCampsiteData}
          />
        )}
        {formStep === 2 && droppedMarker && (
          <NewCampsiteBasicInfoForm
            setFormStep={setFormStep}
            setNewCampsiteData={setNewCampsiteData}
          />
        )}
        {formStep === 3 && (
          <NewCampsiteContactsForm
            setFormStep={setFormStep}
            setNewCampsiteData={setNewCampsiteData}
            newCampsiteName={
              newCampsiteData.campsite_name && newCampsiteData.campsite_name
            }
          />
        )}
        {formStep === 4 && (
          <ReviewAndSubmitNewCampsite
            newCampsiteAddress={newCampsiteAddress}
            newCampsiteData={newCampsiteData}
            setFormStep={setFormStep}
          />
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
  formContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 80,
  },
});
