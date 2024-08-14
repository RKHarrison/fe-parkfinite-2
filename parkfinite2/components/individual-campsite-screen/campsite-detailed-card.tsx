import { getCampsiteById } from "@/services/api/campsitesApi";
import { Campsite } from "@/types/api-data-types/campsite-types";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { ImageCarousel } from "../ImageCarousel";

import { convertNumberToStars } from "@/utils/convertNumberToStars";
import FieldAndDataText from "@/components/FieldAndDataText";
import CampsiteContacts from "./campsite-detailed-components/campsite-contacts";
import CampsiteBasicInfo from "./campsite-detailed-components/campsite-basic-info";

export default function CampsiteDetailedCard({
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

  return (
    <ScrollView>
      <View style={styles.headerContainer}>
        <Text style={styles.h1}>{loadedCampsite?.campsite_name}</Text>
        <FieldAndDataText
          title="Average rating"
          data={loadedCampsite?.average_rating}
        />
        <Text>
          {loadedCampsite?.average_rating &&
            convertNumberToStars(loadedCampsite.average_rating)}
        </Text>
      </View>
      <ImageCarousel campsitePhotos={loadedCampsite?.photos} />
      {loadedCampsite && <CampsiteBasicInfo campsite={loadedCampsite} />}
      {loadedCampsite?.contacts[0] && (
        <CampsiteContacts campsiteContacts={loadedCampsite.contacts} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: 350,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 1,
    marginTop: 10,
    alignSelf: "center",
    borderRadius: 10,
  },
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
