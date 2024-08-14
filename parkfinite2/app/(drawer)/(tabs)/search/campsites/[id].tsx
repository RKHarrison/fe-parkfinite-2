import { Text, View } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { getCampsiteById } from "@/services/api/campsitesApi";
import CampsiteDetailedCard from "@/components/individual-campsite-screen/campsite-detailed-card";


export default function ViewCampsite() {
  const { id } = useLocalSearchParams<{ id: string | string[] }>();

  return (
    <CampsiteDetailedCard id={id}/>
  );
}
