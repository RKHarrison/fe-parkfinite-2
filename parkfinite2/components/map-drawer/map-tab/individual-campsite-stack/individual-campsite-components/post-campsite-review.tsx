import { useContext, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { campsiteDetailedCardStyles } from "../individual-campsite-styles";
import StarRatingComponent, { StarRating } from "@/components/StarRating";
import { Button } from "@/components/Button";
import { CampsiteReviewPostRequest } from "@/types/api-data-types/campsite-types";
import { UserContext } from "@/contexts/UserContext";
import FieldAndDataText from "@/components/FieldAndDataText";
import { postReviewByCampsiteId } from "@/services/api/campsitesApi";

type PostCampsiteReviewProps = {
  campsiteId: number;
};

export default function PostCampsiteReview({
  campsiteId,
}: PostCampsiteReviewProps) {
  const { user } = useContext(UserContext);
  const { control, handleSubmit, setValue } =
    useForm<CampsiteReviewPostRequest>({
      defaultValues: {
        user_account_id: user?.user_account_id,
        comment: null,
      },
    });

  return (
    <View style={campsiteDetailedCardStyles.container}>
      <Text>PostCampsiteReview</Text>

      <Controller control={control} name="rating" rules={{required:true}}
      render={({ field: { onChange, value } }) => (
        <StarRatingComponent onRatingChange={onChange} />
      )} />

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
          postReviewByCampsiteId(campsiteId, data);
        })}
      />
    </View>
  );
}
