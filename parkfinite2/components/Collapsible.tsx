import Ionicons from "@expo/vector-icons/Ionicons";
import { PropsWithChildren, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  ViewStyle,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";

export type CollapsibleContainerStyle = ViewStyle;

export function Collapsible({
  children,
  title,
  collapsibleContainerStyle,
}: PropsWithChildren & {
  title: string;
  collapsibleContainerStyle?: CollapsibleContainerStyle;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? "light";

  return (
    <ThemedView style={[styles.container, collapsibleContainerStyle]}>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-forward-outline"}
          size={18}
          color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
        />
        <ThemedText type="defaultSemiBold">{`${
          isOpen ? "Hide" : "Show"
        } ${title}`}</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
    position: "absolute",
    width: "100%",
    bottom: 70,
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  content: {
    marginBottom: 6,
    marginLeft: 24,
    borderRadius: 5,
  },
});
