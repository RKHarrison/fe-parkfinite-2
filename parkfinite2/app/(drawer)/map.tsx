import { Text, View} from "react-native";
import { Link } from "expo-router";
import React from "react";

export default function Map() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit (tabs)/map.tsx to edit this screen.</Text>
      <Link href="(drawer)/(tabs)/map/postNewCampsite">Post a new camping spot...</Link>
    </View>
  );
}
