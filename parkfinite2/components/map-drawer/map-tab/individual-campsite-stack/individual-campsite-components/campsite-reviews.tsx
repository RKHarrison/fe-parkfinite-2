import { View, Text } from "react-native";
import { useEffect } from "react";
import { getReviewsByCampsiteId } from "@/services/api/campsitesApi";
import { CampsiteReview } from "@/types/api-data-types/campsite-types";
import { campsiteDetailedCardStyles } from "../individual-campsite-styles";
import { convertNumberToStars } from "@/utils/convertNumberToStars";

type CampsiteReviewsProps = {
  campsiteId: number;
  campsiteReviews: CampsiteReview[];
  setCampsiteReviews: (value: CampsiteReview[]) => void;
};

export default function CampsiteReviews({
  campsiteId,
  campsiteReviews,
  setCampsiteReviews,
}: CampsiteReviewsProps) {
  useEffect(() => {
    getReviewsByCampsiteId(campsiteId).then((reviewsFromApi) => {
      setCampsiteReviews(reviewsFromApi);
    });
  }, [campsiteId]);

  return (
    <>
      <View style={campsiteDetailedCardStyles.container}>
        <Text style={campsiteDetailedCardStyles.h2}>Reviews</Text>
        {campsiteReviews.length > 0 ? (
          campsiteReviews.map((review) => (
            <View
              style={campsiteDetailedCardStyles.subContainer}
              key={review.review_id}
            >
              <Text>{convertNumberToStars(review.rating)}</Text>
              <Text>{review.comment}</Text>
              <Text style={campsiteDetailedCardStyles.h3}>
                {review.username}
              </Text>
            </View>
          ))
        ) : (
          <Text style={campsiteDetailedCardStyles.italicText}>
            Be the first to review this campsite...
          </Text>
        )}
      </View>
    </>
  );
}
