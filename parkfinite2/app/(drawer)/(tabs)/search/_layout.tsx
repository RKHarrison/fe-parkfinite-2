import { Stack } from "expo-router";

export default function MapLayout() {
  return (
  <Stack>
   <Stack.Screen name="map" options={{ headerShown: false }}/>
   <Stack.Screen name="campsites/[id]" options={{ headerShown: true, headerTitle: "Campsite 1" }}/>
  </Stack>
  )
}
