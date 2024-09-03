import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { DroppedMarkerContext } from "@/contexts/DroppedMarkerContext";
import NewCampsiteBasicInfoForm from "./form-components/new-campsite-basic-info-form";
import ChooseNewCampsiteLocation from "./form-components/choose-new-campsite-locartion-form";
import { UserContext } from "@/contexts/UserContext";
import NewCampsiteContactsForm from "./form-components/new-campsite-contacts-form";

export default function MultiStepPostNewCampsiteForm() {
  const { droppedMarker, setDroppedMarker } = useContext(DroppedMarkerContext);
  const [formStep, setFormStep] = useState(1);
  const [newCampsiteData, setNewCampsiteData] = useState({});

  useEffect(()=> {
    console.log(newCampsiteData);
  }, [newCampsiteData])

  useEffect(()=>{
    setFormStep(1)
    setNewCampsiteData({})
  }, [droppedMarker])

  return (
    <>
      <View style={styles.screenContainer}>
        <Text style={styles.h1}>Post a new campsite!</Text>
        {formStep === 1 && (
          <ChooseNewCampsiteLocation
            setFormStep={setFormStep}
            setNewCampsiteData={setNewCampsiteData}
          />
        )}
        {formStep === 2 && droppedMarker && (
          <NewCampsiteBasicInfoForm setFormStep={setFormStep} setNewCampsiteData={setNewCampsiteData}/>
        )}
        {formStep === 3 && (<NewCampsiteContactsForm  setFormStep={setFormStep} setNewCampsiteData={setNewCampsiteData} newCampsiteName={newCampsiteData.campsite_name ? newCampsiteData.campsite_name : "Not set"}/>)}
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
