import { View } from "react-native";
import { CampsiteContact } from "@/types/api-data-types/campsite-types";
import { campsiteDetailedCardStyles } from "@/components/individual-campsite-screen/campsite-detailed-styles";
import FieldAndDataText from "@/components/FieldAndDataText";

type CampsiteContactProps = {
  campsiteContacts: CampsiteContact[];
};

export default function CampsiteContacts({
  campsiteContacts,
}: CampsiteContactProps) {
  return (
    <>
      <View style={campsiteDetailedCardStyles.container}>
        <FieldAndDataText
          title="Phone"
          data={campsiteContacts[0].campsite_contact_phone}
        />
        <FieldAndDataText
          title="Email"
          data={campsiteContacts[0].campsite_contact_email}
        />
      </View>
    </>
  );
}
