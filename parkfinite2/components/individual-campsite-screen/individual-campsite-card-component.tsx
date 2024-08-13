import { getCampsiteById } from "@/services/api/campsitesApi";
import { Campsite } from "@/types/api-data-types/campsite-types";
import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { ImageCarousel } from "../ImageCarousel";
import ParallaxScrollView from "../ParallaxScrollView";

import { motorhomeicon } from "@/assets/images/campsite-icons/motorhome-free-icon.png";
import { convertNumberToStars } from "@/utils/convertNumberToStars";

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

  return (
    <ScrollView>
      <View style={styles.headerContainer}>
        <Text style={styles.h1}>{loadedCampsite?.campsite_name}</Text>
      </View>
      <ImageCarousel campsitePhotos={loadedCampsite?.photos} />
      <View style={styles.container}>
        <Text style={styles.h2}>{loadedCampsite?.category.category_name}</Text>
        <Text>{convertNumberToStars(loadedCampsite?.average_rating)}</Text>
        <Text>Average user rating: {loadedCampsite?.average_rating}</Text>
        <Text>
          Added on {loadedCampsite?.date_added} by {loadedCampsite?.added_by}
        </Text>
        <Text>Description: {loadedCampsite?.description}</Text>
      </View>
      {loadedCampsite?.contacts[0] && (
        <View style={styles.container}>
          <Text style={styles.h2}>CONTACT INFO</Text>
          <Text>Name: {loadedCampsite?.contacts[0].campsite_contact_name}</Text>
          <Text>
            Phone: {loadedCampsite?.contacts[0].campsite_contact_phone}
          </Text>
          <Text>
            Email: {loadedCampsite?.contacts[0].campsite_contact_email}
          </Text>
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
  }
});
