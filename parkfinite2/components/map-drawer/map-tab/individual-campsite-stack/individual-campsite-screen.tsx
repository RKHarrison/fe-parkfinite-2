import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getCampsiteById } from "@/services/api/campsitesApi";
import { Campsite } from "@/types/api-data-types/campsite-types";
import { CampsiteReview } from "@/types/api-data-types/campsite-types";

import { ImageCarousel } from "@/components/ImageCarousel";
import CampsiteBasicInfo from "./individual-campsite-components/campsite-basic-info";
import CampsiteContacts from "./individual-campsite-components/campsite-contacts";
import CampsiteHeaderAndRating from "./individual-campsite-components/campsite-header-and-rating";
import CampsiteReviews from "./individual-campsite-components/campsite-reviews";
import PostCampsiteReview from "./individual-campsite-components/post-campsite-review";

type IndividualCampsiteScreenProps = {
  id: string | string[];
};

export default function IndividualCampsiteScreen({
  id,
}: IndividualCampsiteScreenProps) {
  const [loadedCampsite, setLoadedCampsite] = useState<Campsite | null>(null);
  const [campsiteReviews, setCampsiteReviews] = useState<CampsiteReview[]>([]);
  const [userHasReviewed, setUserHasReviewed] = useState<boolean>(false);

  useEffect(() => {
    getCampsiteById(id).then((campsiteFromApi) =>
      setLoadedCampsite(campsiteFromApi)
    );
  }, [id]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loadedCampsite && (
        <ScrollView>
          <CampsiteHeaderAndRating campsite={loadedCampsite} />
          <ImageCarousel campsitePhotos={loadedCampsite.photos} />
          <CampsiteBasicInfo campsite={loadedCampsite} />
          {loadedCampsite.contacts[0] && (
            <CampsiteContacts campsiteContacts={loadedCampsite.contacts} />
          )}
          {!userHasReviewed && (
            <PostCampsiteReview
              campsiteId={loadedCampsite.campsite_id}
              setUserHasReviewed={setUserHasReviewed}
              setCampsiteReviews={setCampsiteReviews}
            />
          )}
          <CampsiteReviews
            campsiteId={loadedCampsite.campsite_id}
            campsiteReviews={campsiteReviews}
            setCampsiteReviews={setCampsiteReviews}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
