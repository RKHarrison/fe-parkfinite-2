import { View, Text, StyleSheet } from "react-native";
import formatDateStamp from "@/utils/formatDateStamp";
import { Campsite } from "@/types/api-data-types/campsite-types";
import { campsiteDetailedCardStyles } from "../individual-campsite-styles";
import FieldAndDataText from "@/components/FieldAndDataText";

type CampsiteBasicInfoProps = {
  campsite: Campsite;
};

export default function CampsiteBasicInfo({
  campsite,
}: CampsiteBasicInfoProps) {
  return (
    <View style={campsiteDetailedCardStyles.container}>
      <Text style={campsiteDetailedCardStyles.h2}>
        {campsite?.category.category_name}
      </Text>
      <FieldAndDataText
        title="Added on"
        data={campsite && formatDateStamp(campsite.date_added)}
      />
      <FieldAndDataText title="Added by" data={campsite.username} />
      <Text style={{ fontStyle: "italic" }}>
        {campsite.description && `"${campsite.description}"`}
      </Text>
    </View>
  );
}
