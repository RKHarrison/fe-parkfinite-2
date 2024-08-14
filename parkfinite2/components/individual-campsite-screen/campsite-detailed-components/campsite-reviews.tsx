import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { getReviewsByCampsiteId } from "@/services/api/campsitesApi";
import { CampsiteReview } from "@/types/api-data-types/campsite-types";
import { campsiteDetailedCardStyles } from "../campsite-detailed-styles";
import { convertNumberToStars } from "@/utils/convertNumberToStars";

type CampsiteReviewsProps = {
  campsiteId: number;
};

export default function CampsiteReviews({ campsiteId }: CampsiteReviewsProps) {
  const [campsiteReviews, setCampsiteReviews] = useState<CampsiteReview[]>([]);

  useEffect(() => {
    getReviewsByCampsiteId(campsiteId).then((reviewsFromApi) => {
      setCampsiteReviews(reviewsFromApi);
    });
  }, [campsiteId]);

  return (
    <>
      <View style={campsiteDetailedCardStyles.container}>
        <Text style={campsiteDetailedCardStyles.h2}>Reviews</Text>
        {campsiteReviews.map((review) => (
          <View style={campsiteDetailedCardStyles.subContainer}>
            <Text>{convertNumberToStars(review.rating)}</Text>
            <Text>{review.comment}</Text>
            <Text style={campsiteDetailedCardStyles.h3}>{review.username}</Text>
          </View>
        ))}
      </View>
    </>
  );
}
