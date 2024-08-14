import { useLocalSearchParams } from "expo-router";
import CampsiteDetailedCard from "@/components/individual-campsite-screen/campsite-detailed-card";

export default function ViewCampsite() {
  const { id } = useLocalSearchParams<{ id: string | string[] }>();

  return <CampsiteDetailedCard id={id} />;
}
