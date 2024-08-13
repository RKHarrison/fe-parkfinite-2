import { Text, View } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { getCampsiteById } from "@/services/api/campsitesApi";
import IndividualCampsiteCard from "@/components/individual-campsite-screen/individual-campsite-card-component";


export default function ViewCampsite() {
  const { id } = useLocalSearchParams<{ id: string | string[] }>();

  return (
    <IndividualCampsiteCard id={id}/>
  );
}
