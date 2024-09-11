import { useEffect } from "react";
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
      <StarRatingComponent
        initialRating={rating}
        onRatingChange={handleRatingChange}
      />
      {rating && <Button title="Confirm rating" onPress={() => setFormStep(FORM_STEPS.checkAndSubmit)} />}
      <Button title="Back to contacts" onPress={() => setFormStep(FORM_STEPS.contacts)} />
    </>
  );
}
