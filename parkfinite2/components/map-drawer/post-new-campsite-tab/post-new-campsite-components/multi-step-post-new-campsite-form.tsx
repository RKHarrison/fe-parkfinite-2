import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { DroppedMarkerContext } from "@/contexts/DroppedMarkerContext";
import { getAddressFromCoordinate } from "@/services/api/googleMapsApi";
import NewCampsiteBasicInfoForm from "./form-components/new-campsite-basic-info-form";
import ChooseNewCampsiteLocation from "./form-components/choose-new-campsite-locartion-form";
import { UserContext } from "@/contexts/UserContext";
import NewCampsiteContactsForm from "./form-components/new-campsite-contacts-form";
import ReviewAndSubmitNewCampsite from "./form-components/review-and-submit-page";
import RateNewCampsite from "./form-components/rate-new-campsite";
import { CampsitePostRequest } from "@/types/api-data-types/campsite-types";

export default function MultiStepPostNewCampsiteForm() {
  const { droppedMarker, setDroppedMarker } = useContext(DroppedMarkerContext);
  const [formStep, setFormStep] = useState<number>(1);
  const [newCampsiteAddress, setNewCampsiteAddress] = useState<string | null>(null);
  const [newCampsiteData, setNewCampsiteData] = useState<CampsitePostRequest | null>(null);
  const [rating, setRating] = useState<number | null>(null);

  useEffect(() => {
    console.log(newCampsiteData);
  }, [newCampsiteData]);

  useEffect(() => {
    setFormStep(1);
    setNewCampsiteData(null);
    if (droppedMarker) {
      getAddressFromCoordinate(droppedMarker).then((res) => {
        setNewCampsiteAddress(prevCampsiteAdress => res);
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
        {formStep === 2 && (
          <NewCampsiteBasicInfoForm
            setFormStep={setFormStep}
            newCampsiteData={newCampsiteData}
            setNewCampsiteData={setNewCampsiteData}
          />
        )}
        {formStep === 3 && (
          <NewCampsiteContactsForm
            setFormStep={setFormStep}
            newCampsiteData={newCampsiteData}
            setNewCampsiteData={setNewCampsiteData}
          />
        )}
        {formStep === 4 && (
          <RateNewCampsite
            rating={rating}
            setRating={setRating}
            setFormStep={setFormStep}
          />
        )}
        {formStep === 5 && newCampsiteData && (
          <ReviewAndSubmitNewCampsite
            newCampsiteAddress={newCampsiteAddress}
            newCampsiteData={newCampsiteData}
            rating={rating}
            setRating={setRating}
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
