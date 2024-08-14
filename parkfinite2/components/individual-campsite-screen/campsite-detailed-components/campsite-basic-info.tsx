import FieldAndDataText from "@/components/FieldAndDataText";
import { Campsite } from "@/types/api-data-types/campsite-types";
import formatDateStamp from "@/utils/formatDateStamp";
import { View, Text, StyleSheet } from "react-native";
import { campsiteDetailedCardStyles } from "../campsite-detailed-styles";

type CampsiteBasicInfoProps = {
  campsite: Campsite;
};

export default function CampsiteBasicInfo({
  campsite,
}: CampsiteBasicInfoProps) {
  return (
    <View style={campsiteDetailedCardStyles.container}>
      <Text style={campsiteDetailedCardStyles.h2}>{campsite?.category.category_name}</Text>
      <FieldAndDataText
        title="Added on"
        data={campsite && formatDateStamp(campsite.date_added)}
      />
      <FieldAndDataText title="Added by" data={campsite?.added_by} />
      <Text
        style={{ fontStyle: "italic" }}
      >{`"${campsite?.description}"`}</Text>
    </View>
  );
}