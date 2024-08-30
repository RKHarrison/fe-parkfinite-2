import { useLocalSearchParams } from "expo-router";
import IndividualCampsiteStack from "@/components/map-drawer/map-tab/individual-campsite-stack/individual-campsite-stack";

export default function ViewCampsite() {
  const { id } = useLocalSearchParams<{ id: string | string[] }>();

  return <IndividualCampsiteStack id={id} />;
}
