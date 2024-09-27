import { useLocalSearchParams } from "expo-router";
import IndividualCampsiteScreen from "@/components/map-drawer/map-tab/individual-campsite-stack/individual-campsite-screen";

export default function ViewCampsite() {
  const { id } = useLocalSearchParams<{ id: string | string[] }>();

  return <IndividualCampsiteScreen id={id} />;
}
