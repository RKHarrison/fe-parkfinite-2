import { useContext, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { campsiteDetailedCardStyles } from "../individual-campsite-styles";
import StarRatingComponent, { StarRating } from "@/components/StarRating";
import { CampsiteReviewPostRequest } from "@/types/api-data-types/campsite-types";
import { UserContext } from "@/contexts/UserContext";

type PostCampsiteReviewProps = {
  campsiteId: number;
};

export default function PostCampsiteReview({
  campsiteId,
}: PostCampsiteReviewProps) {
  const { user } = useContext(UserContext);
  const [rating, setRating] = useState<StarRating>(null);
  const { control, handleSubmit, setValue } =
    useForm<CampsiteReviewPostRequest>({
      defaultValues: {
        user_account_id: user?.user_account_id,
        comment: null,
      },
    });

  const handleRatingChange = (rating: StarRating) => {
    setRating(rating);
  };

  return (
    <View style={campsiteDetailedCardStyles.container}>
      <Text>PostCampsiteReview</Text>

      <StarRatingComponent onRatingChange={handleRatingChange} />

    </View>
  );
}
