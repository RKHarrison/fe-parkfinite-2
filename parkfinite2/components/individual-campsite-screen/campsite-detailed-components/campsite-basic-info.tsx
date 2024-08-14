import FieldAndDataText from "@/components/FieldAndDataText";
import { Campsite } from "@/types/api-data-types/campsite-types";
import formatDateStamp from "@/utils/formatDateStamp";
import { View, Text, StyleSheet } from "react-native";

type CampsiteBasicInfoProps = {
  campsite: Campsite;
};

export default function CampsiteBasicInfo({
  campsite,
}: CampsiteBasicInfoProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.h2}>{campsite?.category.category_name}</Text>
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

const styles = StyleSheet.create({
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
