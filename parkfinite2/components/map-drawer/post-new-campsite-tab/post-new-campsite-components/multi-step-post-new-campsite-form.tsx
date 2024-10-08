import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { DroppedMarkerContext } from "@/contexts/DroppedMarkerContext";
import { getAddressFromCoordinate } from "@/services/api/googleMapsApi";
import { CampsitePostRequest } from "@/types/api-data-types/campsite-types";
import { FORM_STEPS } from "@/constants/postCampsiteFormSteps";
import ChooseNewCampsiteLocation from "./form-components/choose-new-campsite-locartion-form";
import NewCampsiteBasicInfoForm from "./form-components/new-campsite-basic-info-form";
import NewCampsiteContactsForm from "./form-components/new-campsite-contacts-form";
import ReveiwNewCampsite from "./form-components/review-new-campsite";
import CheckandSubmitNewCampsite from "./form-components/check-and-submit-page";

export default function MultiStepPostNewCampsiteForm() {
  const { droppedMarker, setDroppedMarker } = useContext(DroppedMarkerContext);
  const [formStep, setFormStep] = useState<number>(FORM_STEPS.location);
  const [newCampsiteAddress, setNewCampsiteAddress] = useState<string | null>(
    null
  );
  const [newCampsiteData, setNewCampsiteData] =
    useState<CampsitePostRequest | null>(null);
  const [rating, setRating] = useState<number | null>(null);

  useEffect(() => {
    setFormStep(1);
    setNewCampsiteData(null);
    if (droppedMarker) {
      getAddressFromCoordinate(droppedMarker).then((res) => {
        setNewCampsiteAddress((prevCampsiteAdress) => res);
      });
    }
    setRating(null);
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
          <ReveiwNewCampsite
            rating={rating}
            setRating={setRating}
            setFormStep={setFormStep}
          />
        )}
        {formStep === 5 && newCampsiteData && (
          <CheckandSubmitNewCampsite
            newCampsiteAddress={newCampsiteAddress}
            newCampsiteData={newCampsiteData}
            rating={rating}
            setRating={setRating}
            setFormStep={setFormStep}
            setDroppedMarker={setDroppedMarker}
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
