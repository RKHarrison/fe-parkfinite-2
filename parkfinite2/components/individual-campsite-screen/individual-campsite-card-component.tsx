import { getCampsiteById } from "@/services/api/campsitesApi";
import { Campsite } from "@/types/api-data-types/campsite-types";
import { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";

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
      <Text>{loadedCampsite?.campsite_name}</Text>
      <Text>{loadedCampsite?.category.category_name}</Text>
      <Text>Average user rating: {loadedCampsite?.average_rating}</Text>
      <Text>Added on {loadedCampsite?.date_added} by {loadedCampsite?.added_by}</Text>
      <Text>Description: {loadedCampsite?.description}</Text>
      <Text>CONTACT INFO</Text>
      <Text>Name: {loadedCampsite?.contacts[0].campsite_contact_name}</Text>
      <Text>Phone: {loadedCampsite?.contacts[0].campsite_contact_phone}</Text>
      <Text>Email: {loadedCampsite?.contacts[0].campsite_contact_email}</Text>
    </View>
  );
}
