import { View } from "react-native";
import { useEffect } from "react";
import { getReviewsByCampsiteId } from "@/services/api/campsitesApi";

type CampsiteReviewsProps = {
  campsiteId: string;
};

export default function CampsiteReviews({
  campsiteId,
}: CampsiteReviewsProps) {

    useEffect(()=> {
        getReviewsByCampsiteId(campsiteId).then(reviewsFromApi =>{
            console.log(reviewsFromApi);
            
        })
    }, [campsiteId])

  return (
    <View></View>
  );
}
