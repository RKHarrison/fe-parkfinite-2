import { getCampsiteById } from "@/services/api/campsitesApi";
import { Campsite } from "@/types/api-data-types/campsite-types";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { ImageCarousel } from "../ImageCarousel";

import { convertNumberToStars } from "@/utils/convertNumberToStars";
import FieldAndDataText from "@/components/FieldAndDataText";
import CampsiteContacts from "./campsite-detailed-components/campsite-contacts";
import CampsiteBasicInfo from "./campsite-detailed-components/campsite-basic-info";
import CampsiteHeaderAndRating from "./campsite-detailed-components/campsite-header-and-rating";

export default function CampsiteDetailedCard({
  id,
}: {
  id: string | string[];
}) {
  const [loadedCampsite, setLoadedCampsite] = useState<Campsite | null>(null);

  useEffect(() => {
    getCampsiteById(id).then((campsiteFromApi) =>
      setLoadedCampsite(campsiteFromApi)
    );
  }, [id]);

  return (
    <>
      {loadedCampsite && (
        <ScrollView>
          <CampsiteHeaderAndRating campsite={loadedCampsite} />
          <ImageCarousel campsitePhotos={loadedCampsite.photos} />
          <CampsiteBasicInfo campsite={loadedCampsite} />
          {loadedCampsite.contacts[0] && (
            <CampsiteContacts campsiteContacts={loadedCampsite.contacts} />
          )}
        </ScrollView>
      )}
    </>
  )};