import { Text, View} from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import React from "react";

export default function ViewCampsite() {
    const {id} = useLocalSearchParams();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Details for campsite {id}</Text>
    </View>
  );
}
