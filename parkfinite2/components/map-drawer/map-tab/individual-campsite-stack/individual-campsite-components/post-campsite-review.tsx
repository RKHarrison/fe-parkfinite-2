import { useState } from "react";
import { Text, View } from "react-native";
import { campsiteDetailedCardStyles } from "../individual-campsite-styles";
import StarRatingComponent, { StarRating } from "@/components/StarRating";

type PostCampsiteReviewProps = {
  campsiteId: number;
};

export default function PostCampsiteReview({
  campsiteId,
}: PostCampsiteReviewProps) {
  const [rating, setRating] = useState<StarRating>(null);

  const handleRatingChange = (rating: number) => {
    setRating(rating);
  };

  return (
    <View style={campsiteDetailedCardStyles.container}>
      <Text>PostCampsiteReview</Text>
      <StarRatingComponent
        initialRating={rating}
        onRatingChange={handleRatingChange}
      />
    </View>
  );
}
