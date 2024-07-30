import { Pressable, Text, View } from "react-native";
import { Link, router } from "expo-router";
import React from "react";
import { ThemedText } from "@/components/ThemedText";

export default function Map() {
  let campsiteId = 2;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit (drawer)/(tabs)/search/map.tsx to edit this screen.</Text>
      <Link href="/(drawer)/(tabs)/search/campsites/1">
        <ThemedText type="link">
          View full campsite details for campsite 1...
        </ThemedText>
      </Link>
      <Pressable
        onPress={() =>
          router.push(`/(drawer)/(tabs)/search/campsites/${campsiteId}`)
        }
      >
        <ThemedText type="link">
          View full campsite details for campsite {campsiteId}...
        </ThemedText>
      </Pressable>
      <Link href="/(drawer)/(tabs)/new-campsite">
        <ThemedText type="link">Post a new camping location...</ThemedText>
      </Link>
    </View>
  );
}
