import { Campsite } from "@/types/api-data-types/campsite-types";
import { Collapsible } from "../Collapsible";
import { Text } from "react-native";

export function CampsiteInfoCard({
  selectedCampsite,
}: {
  selectedCampsite: Campsite;
}) {
  return (
    <Collapsible title={"Campsite Info"}>
      <Text>{selectedCampsite?.campsite_name}</Text>
      <Text>Average Rating: {selectedCampsite?.average_rating}</Text>
      <Text>Date Added: {selectedCampsite?.date_added}</Text>
      <Text>Description: {selectedCampsite?.description}</Text>
    </Collapsible>
  );
}
