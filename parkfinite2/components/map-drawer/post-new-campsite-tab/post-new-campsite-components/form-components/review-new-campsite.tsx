import { StyleSheet, Text } from "react-native";
import StarRatingComponent, { StarRating } from "@/components/StarRating";
import { Button } from "@/components/Button";
import { FORM_STEPS } from "@/constants/postCampsiteFormSteps";

interface ReveiwNewCampsiteProps {
  rating: StarRating;
  setRating: (rating: StarRating) => void;
  setFormStep: (step: number) => void;
}

export default function ReveiwNewCampsite({
  rating,
  setRating,
  setFormStep,
}: ReveiwNewCampsiteProps) {
  const handleRatingChange = (newRating: StarRating) => {
    setRating(newRating);
  };

  return (
    <>
      <Text style={styles.h2}>
        Step 4 - Rate your new spot (how was your stay?):
      </Text>
      <StarRatingComponent
        initialRating={rating}
        onRatingChange={handleRatingChange}
      />
      {rating && <Button title="Confirm rating" onPress={() => setFormStep(FORM_STEPS.checkAndSubmit)} />}
      <Button title="Back to contacts" onPress={() => setFormStep(FORM_STEPS.contacts)} />
    </>
  );
}

const styles = StyleSheet.create({
  h2: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
