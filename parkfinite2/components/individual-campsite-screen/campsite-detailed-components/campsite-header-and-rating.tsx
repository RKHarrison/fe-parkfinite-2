import FieldAndDataText from "@/components/FieldAndDataText";
import { Campsite } from "@/types/api-data-types/campsite-types";
import { convertNumberToStars } from "@/utils/convertNumberToStars";
import { StyleSheet, Text, View } from "react-native";

type CampsiteHeaderAndRatingProps = {
  campsite: Campsite;
};

export default function CampsiteHeaderAndRating({
  campsite,
}: CampsiteHeaderAndRatingProps) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.h1}>{campsite.campsite_name}</Text>
      <FieldAndDataText title="Average rating" data={campsite.average_rating} />
      <Text>
        {campsite.average_rating &&
          convertNumberToStars(campsite.average_rating)}
      </Text>
    </View>
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
