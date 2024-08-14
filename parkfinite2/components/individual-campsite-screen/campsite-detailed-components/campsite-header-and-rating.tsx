import FieldAndDataText from "@/components/FieldAndDataText";
import { Campsite } from "@/types/api-data-types/campsite-types";
import { convertNumberToStars } from "@/utils/convertNumberToStars";
import { Text, View } from "react-native";
import { campsiteDetailedCardStyles } from "../campsite-detailed-styles";

type CampsiteHeaderAndRatingProps = {
  campsite: Campsite;
};

export default function CampsiteHeaderAndRating({
  campsite,
}: CampsiteHeaderAndRatingProps) {
  return (
    <View style={campsiteDetailedCardStyles.headerContainer}>
      <Text style={campsiteDetailedCardStyles.h1}>{campsite.campsite_name}</Text>
      <FieldAndDataText title="Average rating" data={campsite.average_rating} />
      <Text>
        {campsite.average_rating &&
          convertNumberToStars(campsite.average_rating)}
      </Text>
    </View>
  );
}