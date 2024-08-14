import { getCampsiteById } from "@/services/api/campsitesApi";
import { Campsite } from "@/types/api-data-types/campsite-types";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { ImageCarousel } from "../ImageCarousel";

import { convertNumberToStars } from "@/utils/convertNumberToStars";
import formatDateStamp from "@/utils/formatDateStamp";
import FieldAndDataText from "@/components/FieldAndDataText";

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
      <View style={styles.container}>
        <Text style={styles.h2}>{loadedCampsite?.category.category_name}</Text>
        <FieldAndDataText
          title="Added on"
          data={loadedCampsite && formatDateStamp(loadedCampsite?.date_added)}
        />
        <FieldAndDataText title="Added by" data={loadedCampsite?.added_by} />
        <Text style={{ fontStyle: "italic" }}>{`"${loadedCampsite?.description}"`}</Text>
      </View>
      {loadedCampsite?.contacts[0] && (
        <View style={styles.container}>
          <Text style={styles.h2}>CONTACT INFO</Text>
          <FieldAndDataText
            title="Name"
            data={loadedCampsite?.contacts[0].campsite_contact_name}
          />
          <FieldAndDataText
            title="Phone"
            data={loadedCampsite?.contacts[0].campsite_contact_phone}
          />
          <FieldAndDataText
            title="Email"
            data={loadedCampsite?.contacts[0].campsite_contact_email}
          />
        </View>
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
