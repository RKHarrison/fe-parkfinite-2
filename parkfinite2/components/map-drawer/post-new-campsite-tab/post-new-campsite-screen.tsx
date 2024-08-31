import { View, Text, StyleSheet } from "react-native";
import PostNewCampsiteForm from "./post-new-campsite-components/post-new-campsite-form";
import { ScrollView } from "react-native-gesture-handler";

export default function PostNewCampsiteScreen() {
  return (
    <ScrollView>
      <PostNewCampsiteForm />
    </ScrollView>
  );
}

