import { Tabs } from "expo-router";
import React, { useContext } from "react";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { UserContext } from "@/contexts/UserContext";
import { CustomCoordinatesProvider } from "@/contexts/CustomCoordinatesContext";

export default function TabLayout() {
  const { user } = useContext(UserContext);
  const colorScheme = useColorScheme();

  return (
    <CustomCoordinatesProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: true,
          headerStyle: {
            backgroundColor: "green",
          },
        }}
      >
        <Tabs.Screen
          name="search"
          options={{
            headerShown: false,
            title: "Go to Map",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "map" : "map-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="post-new-campsite"
          options={{
            headerShown: false,
            title: "Post new campsite",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "pin" : "pin-outline"}
                color={color}
              />
            ),
            href: "/(drawer)/(tabs)/post-new-campsite",
          }}
        />
      </Tabs>
    </CustomCoordinatesProvider>
  );
}
