import { useContext } from "react";
import { Text, TextInput, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { campsiteDetailedCardStyles } from "../individual-campsite-styles";
import StarRatingComponent from "@/components/StarRating";
import { Button } from "@/components/Button";
import {
  CampsiteReviewPostRequest,
  CampsiteReview,
} from "@/types/api-data-types/campsite-types";
import { UserContext } from "@/contexts/UserContext";
import { postReviewByCampsiteId } from "@/services/api/campsitesApi";

type PostCampsiteReviewProps = {
  campsiteId: number;
  setUserHasReviewed: (value: boolean) => void;
  setCampsiteReviews: React.Dispatch<React.SetStateAction<CampsiteReview[]>>;
};

export default function PostCampsiteReview({
  campsiteId,
  setUserHasReviewed,
  setCampsiteReviews,
}: PostCampsiteReviewProps) {
  const { user } = useContext(UserContext);
  const { control, handleSubmit } = useForm<CampsiteReviewPostRequest>({
    defaultValues: {
      user_account_id: user?.user_account_id,
      comment: null,
    },
  });

  const handleReviewSubmission = async (data: CampsiteReviewPostRequest) => {
    if (!user) {
      alert("Please log in again to post a review.");
      return;
    }
    const tempReviewID = Number(`-${campsiteId}${user?.user_account_id}${Date.now()}`);
    const optimisticReview = ({
      rating: data.rating,
      comment: data.comment,
      username: user?.username,
      campsite_id: campsiteId,
      review_id: tempReviewID,
    });

    try {
      updateReviewsWithOptimisticReview(optimisticReview);
      const reviewFromApi = await postReviewByCampsiteId(campsiteId, data);
      replaceTemporaryReview(tempReviewID, reviewFromApi);

    } catch (error) {
      setUserHasReviewed(false);
      alert("Failed to post review. Please try again later.");
    }
  };

  const updateReviewsWithOptimisticReview = (newReview: CampsiteReview) => {
    setUserHasReviewed(true);
    setCampsiteReviews((prevReviews) => [...prevReviews, newReview]);
  };

  const replaceTemporaryReview = (
    tempReviewID: number,
    actualReview: CampsiteReview
  ) => {
    setCampsiteReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.review_id === tempReviewID ? actualReview : review
      )
    );
  };

  return (
    <View style={campsiteDetailedCardStyles.container}>
      <Text>PostCampsiteReview</Text>

      <Controller
        control={control}
        name="rating"
        rules={{ required: true }}
        render={({ field: { onChange } }) => (
          <StarRatingComponent onRatingChange={onChange} />
        )}
      />

      <Controller
        control={control}
        name="comment"
        rules={{ minLength: 4, maxLength: 500 }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={campsiteDetailedCardStyles.textInput}
            placeholder="Leave a comment..."
            onChangeText={onChange}
            value={value ?? ""}
          />
        )}
      />

      <Button title="Submit review" onPress={handleSubmit(handleReviewSubmission)} />
    </View>
  );
}
