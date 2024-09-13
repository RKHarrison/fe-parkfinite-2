import { useContext, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { campsiteDetailedCardStyles } from "../individual-campsite-styles";
import StarRatingComponent, { StarRating } from "@/components/StarRating";
import { Button } from "@/components/Button";
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

      <Controller
        control={control}
        name="comment"
        rules={{ required: false, minLength: 4, maxLength: 500 }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={campsiteDetailedCardStyles.textInput}
            placeholder="Leave a comment..."
            onChangeText={onChange}
            value={value ?? ""}
          />
        )}
      />

      <Button
        title="Submit review"
        onPress={handleSubmit((data) => {
          console.log(data);
        })}
      />
    </View>
  );
}
