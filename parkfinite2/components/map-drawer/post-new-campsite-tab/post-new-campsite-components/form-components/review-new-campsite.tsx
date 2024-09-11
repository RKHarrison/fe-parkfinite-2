import { Button } from "@/components/Button";
import StarRatingComponent, {StarRating} from "@/components/StarRating";
import { useEffect, useState } from "react";


interface ReveiwNewCampsiteProps {
  rating: StarRating
  setRating: (rating: StarRating) => void;
  setFormStep: (step: number) => void;
};

export default function ReveiwNewCampsite({
  rating,
  setRating,
  setFormStep,
}: ReveiwNewCampsiteProps) {
  const handleRatingChange = (newRating: StarRating) => {
    setRating(newRating);
  };

  useEffect(() => {
    console.log(rating);
  }, [rating]);

  return (
    <>
      <StarRatingComponent initialRating={rating} onRatingChange={handleRatingChange} />
      <Button title="Confirm rating" onPress={() => setFormStep(5)} />
    </>
  );
}
