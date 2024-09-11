import { Button } from "@/components/Button";
import StarRatingComponent, {StarRating} from "@/components/StarRating";
import { useEffect, useState } from "react";


interface RateNewCampsiteProps {
  rating: StarRating
  setRating: (rating: StarRating) => void;
  setFormStep: (step: number) => void;
};

export default function RateNewCampsite({
  rating,
  setRating,
  setFormStep,
}: RateNewCampsiteProps) {
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
