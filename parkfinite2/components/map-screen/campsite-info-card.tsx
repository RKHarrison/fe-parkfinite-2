import { Campsite } from "@/types/api-data-types/campsite-types";
import { Collapsible } from "../Collapsible";
import { Text, Image, View } from "react-native";
import { convertNumberToStars } from "@/utils/convertNumberToStars";
import { StyleSheet, ViewStyle } from "react-native";
import { useEffect } from "react";

export function CampsiteInfoCard({
  selectedCampsite,
}: {
  selectedCampsite: Campsite;
}) {
  return (
    <Collapsible
      title="Campsite Info"
      collapsibleContainerStyle={styles.collapsibleContainer}
    >
      <View style={styles.contentContainer}>
        {selectedCampsite?.photos[0]?.campsite_photo_url && (
          <Image
            source={{ uri: selectedCampsite.photos[0].campsite_photo_url }}
            style={styles.image}
          />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.header}>{selectedCampsite?.campsite_name}</Text>
          <Text>{convertNumberToStars(selectedCampsite?.average_rating)}</Text>
          <Text>{selectedCampsite?.description}</Text>
        </View>
      </View>
    </Collapsible>
  );
}

const styles = StyleSheet.create({
  collapsibleContainer: {
    width: "76%",
    zIndex: 1000,
    left: 50,
    right: 50,
    bottom: 70,
    borderRadius: 5,
    paddingRight: 30,
    padding: 8,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    fontWeight: "bold",
    marginBottom: 4,
  },
});
