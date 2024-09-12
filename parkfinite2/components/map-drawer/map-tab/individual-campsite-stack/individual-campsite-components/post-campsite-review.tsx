import { Text, View } from "react-native";
import { campsiteDetailedCardStyles } from "../individual-campsite-styles";

type PostCampsiteReviewProps = {
    campsiteId: number;
}

export default function PostCampsiteReview({campsiteId} : PostCampsiteReviewProps) {
  return (
    <View style={campsiteDetailedCardStyles.container}>
      <Text>PostCampsiteReview</Text>
    </View>
  );
} 