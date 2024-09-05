import { Text, View, ScrollView } from "react-native";
import { Button } from "@/components/Button";
import { CampsitePostRequest } from "@/types/api-data-types/campsite-types";
import FieldAndDataText from "@/components/FieldAndDataText";

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

  return (
    <>
      <Text>Location: {newCampsiteAddress}</Text>
      <Button
        title="Go back to choose location"
        onPress={() => setFormStep(1)}
      />

      <Text>Basic Info: </Text>
      <FieldAndDataText title="Name" data={newCampsiteData.campsite_name} />
      <FieldAndDataText
        title="Description"
        data={newCampsiteData.campsite_description}
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

      <Text>Contact(s): </Text>
      <ScrollView>
        {newCampsiteData.contacts.map((contact, index) => (
          <View key={index}>
            <FieldAndDataText title="Name" data={contact.campsite_contact_name} />
            <FieldAndDataText title="Phone" data={contact.campsite_contact_phone} />
            {contact.campsite_contact_email && <FieldAndDataText title="Email" data={contact.campsite_contact_email} />}
          </View>
        ))}
      </ScrollView>
      <Button title="Go back to contacts" onPress={() => setFormStep(3)} />
    </>
  );
}
