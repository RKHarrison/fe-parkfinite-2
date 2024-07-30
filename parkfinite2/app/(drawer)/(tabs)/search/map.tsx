import { Text, View} from "react-native";
import { Link } from "expo-router";
import React from "react";
import { ThemedText } from "@/components/ThemedText";

export default function Map() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit (drawer)/(tabs)/search/map.tsx to edit this screen.</Text>
      <Link href="/(drawer)/(tabs)/search/campsite"><ThemedText type="link">View full campsite details...</ThemedText></Link>
      <Link href="/(drawer)/(tabs)/new-campsite"><ThemedText type="link">Post a new camping location...</ThemedText></Link>
    </View>
  );
}
