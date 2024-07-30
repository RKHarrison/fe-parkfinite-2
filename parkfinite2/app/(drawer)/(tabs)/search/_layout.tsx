import { Stack } from "expo-router";

export default function MapLayout() {
  return (
  <Stack>
   <Stack.Screen name="map" options={{ headerShown: false }}/>
   <Stack.Screen name="campsite" options={{ headerShown: true }}/>
  </Stack>
  )
}
