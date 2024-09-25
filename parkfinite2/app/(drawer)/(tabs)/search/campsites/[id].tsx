import { Platform, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import IndividualCampsiteScreen from "@/components/map-drawer/map-tab/individual-campsite-stack/individual-campsite-screen";

export default function ViewCampsite() {
  const { id } = useLocalSearchParams<{ id: string | string[] }>();

  return (
    <>
      {Platform.OS === "web" && (
        <Text
          style={{
            zIndex: 20000,
            position: "absolute",
            bottom: 0,
            left: 10,
            color: "red",
            fontWeight: 600,
          }}
        >
          WEB MODE IS IN BETA: some formatting and features might not work as
          expected
        </Text>
      )}
      <IndividualCampsiteScreen id={id} />;
    </>
  );
};
