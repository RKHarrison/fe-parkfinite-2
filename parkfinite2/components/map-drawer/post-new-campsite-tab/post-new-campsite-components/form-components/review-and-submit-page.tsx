import { Text, View, ScrollView, StyleSheet } from "react-native";
import { Button } from "@/components/Button";
import { CampsitePostRequest } from "@/types/api-data-types/campsite-types";
import FieldAndDataText from "@/components/FieldAndDataText";
import { campsiteCategoryMap } from "./new-campsite-basic-info-form";
import { postCampsite } from "@/services/api/campsitesApi";
import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";

interface ReviewAndSubmitNewCampsiteProps {
  newCampsiteAddress: string;
  newCampsiteData: CampsitePostRequest;
  setFormStep: (step: number) => void;
}

export default function ReviewAndSubmitNewCampsite({
  newCampsiteAddress,
  newCampsiteData,
  setFormStep,
}: ReviewAndSubmitNewCampsiteProps) {
  const { user, logout } = useContext(UserContext);

  function handleSubmitNewCampsite() {
    if (user) {
      const fullCampsiteData = {
        ...newCampsiteData,
        user_account_id: user.user_account_id,
      };
      postCampsite(fullCampsiteData, logout);
    }
  }

  return (
    <>
      <Text style={styles.h1}>Location</Text>
      <Text>{newCampsiteAddress}</Text>
      <Button
        title="Go back to choose location"
        onPress={() => setFormStep(1)}
      />

      <Text style={styles.h1}>Basic Info</Text>
      <FieldAndDataText title="Name" data={newCampsiteData.campsite_name} />
      <FieldAndDataText
        title="Category"
        data={campsiteCategoryMap.get(Number(newCampsiteData.category_id))}
      />
      <FieldAndDataText
        title="Description"
        data={newCampsiteData.description}
      />
      <FieldAndDataText
        title="Parking cost"
        data={`£${newCampsiteData.parking_cost}`}
      />
      <FieldAndDataText
        title="Facilities cost"
        data={`£${newCampsiteData.facilities_cost}`}
      />
      <FieldAndDataText
        title="Open between"
        data={
          newCampsiteData.opening_month
            ? `${newCampsiteData.opening_month} and ${newCampsiteData.opening_month}`
            : "n/a"
        }
      />
      <Button title="Go back to basic info" onPress={() => setFormStep(2)} />

      <Text style={styles.h1}>Contact(s)</Text>
      {newCampsiteData.contacts ? (
        <ScrollView
          style={
            newCampsiteData.contacts.length > 1
              ? styles.scrollViewMultiple
              : styles.scrollViewSingle
          }
        >
          {newCampsiteData.contacts.map((contact, index) => (
            <View key={index} style={styles.contactContainer}>
              <FieldAndDataText
                title="Name"
                data={contact.campsite_contact_name}
              />
              <FieldAndDataText
                title="Phone"
                data={contact.campsite_contact_phone}
              />
              {contact.campsite_contact_email && (
                <FieldAndDataText
                  title="Email"
                  data={contact.campsite_contact_email}
                />
              )}
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text>No contacts provided for this spot.</Text>
      )}
      <Button title="Go back to contacts" onPress={() => setFormStep(3)} />

      <Button
        buttonStyle={styles.submitButton}
        title="Confirm campsite details and submit new campsite!"
        onPress={() => handleSubmitNewCampsite()}
      />
    </>
  );
}

const styles = StyleSheet.create({
  h1: { fontSize: 18, fontWeight: "bold", marginTop: 12, marginBottom: 3 },
  scrollViewMultiple: {
    maxHeight: 150,
  },
  scrollViewSingle: {
    maxHeight: 65,
  },
  contactContainer: {
    margin: 10,
  },
  submitButton: {
    marginTop: 12
  }
});
