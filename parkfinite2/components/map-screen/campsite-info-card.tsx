import { Campsite } from "@/types/api-data-types/campsite-types";
import { Collapsible } from "../Collapsible";
import { Text } from "react-native";
import { getStars } from "../GetStars";
import { StyleSheet, ViewStyle } from "react-native";

export function CampsiteInfoCard({
  selectedCampsite,
}: {
  selectedCampsite: Campsite;
}) {
  return (
    <Collapsible title={"Campsite Info"} collapsibleContainerStyle={styles.collapsibleContainer}>
      <Text style={styles.header}>{selectedCampsite?.campsite_name}</Text>
      <Text>{getStars(selectedCampsite?.average_rating)}  </Text>
      <Text>{selectedCampsite?.description}</Text>
    </Collapsible>
  );
}

const styles = StyleSheet.create({
    header: {
        fontWeight: "bold",
    },
    collapsibleContainer: {
        width: "76%",        
        zIndex: 1000,
        left: 50,
        right: 50,
        bottom: 70,
        borderRadius: 5,
        paddingRight: 30,
        padding: 8,
    }
})
