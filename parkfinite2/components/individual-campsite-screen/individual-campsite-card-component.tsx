import { getCampsiteById } from "@/services/api/campsitesApi";
import { Campsite } from "@/types/api-data-types/campsite-types";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";

export default function IndividualCampsiteCard({
  id,
}: {
  id: string | string[];
}) {
  const [loadedCampsite, setLoadedCampsite] = useState<Campsite | null>(null);

  useEffect(() => {
    getCampsiteById(id).then((campsiteFromApi) =>
      setLoadedCampsite(campsiteFromApi)
    );
  }, [id]);

  useEffect(() => {
    console.log("loaded:", loadedCampsite?.campsite_name);
  }, [loadedCampsite]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Details for campsite {id}</Text>
    </View>
  );
}
