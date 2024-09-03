import { View } from "react-native";
import PostNewCampsiteScreen from "@/components/map-drawer/post-new-campsite-tab/post-new-campsite-screen"

export default function PostNewCampsite() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PostNewCampsiteScreen />
    </View>
  );
}
