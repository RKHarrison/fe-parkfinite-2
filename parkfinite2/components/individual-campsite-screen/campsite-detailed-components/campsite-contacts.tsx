import FieldAndDataText from "@/components/FieldAndDataText";
import { CampsiteContact } from "@/types/api-data-types/campsite-types";
import { View, Text, StyleSheet } from "react-native";

type CampsiteContactProps = {
  campsiteContacts: CampsiteContact[];
};

export default function CampsiteContacts({
  campsiteContacts,
}: CampsiteContactProps) {
  return (
    <>
        <View style={styles.container}>
          <Text style={styles.h2}>CONTACT INFO</Text>
          <FieldAndDataText
            title="Name"
            data={campsiteContacts[0].campsite_contact_name}
          />
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

const styles = StyleSheet.create({
  container: {
    width: 350,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 10,
    margin: 10,
    alignSelf: "center",
    backgroundColor: "darkseagreen",
    borderRadius: 10,
  },
  h1: {
    fontSize: 28,
    fontWeight: "bold",
  },
  h2: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
