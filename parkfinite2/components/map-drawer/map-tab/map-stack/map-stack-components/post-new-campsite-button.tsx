import { View } from "react-native";
import { StyleSheet } from "react-native";
import { Button } from "@/components/Button";
import { router } from "expo-router";

export default function PostNewCampsiteButton() {
  return (
    <View style={styles.container}>
      <Button
        title="Create new campsite here"
        onPress={() => router.push("/(drawer)/(tabs)/post-new-campsite")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
    position: "absolute",
    right: 40,
    top: 60,
    borderRadius: 12,
    width: 200,
    height: 30,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
