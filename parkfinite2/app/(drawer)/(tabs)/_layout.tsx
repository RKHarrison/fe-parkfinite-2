import { Tabs } from "expo-router";
import React from "react";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
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
            <TabBarIcon name={focused ? "map" : "map-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="new-campsite"
        options={{
          headerShown: false,
          title: "Post new campsite",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "pin" : "pin-outline"} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
