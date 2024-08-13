import React from "react";
import type { PropsWithChildren } from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from "react-native";

type Props = PropsWithChildren<{
  title: string;
  onPress: () => void;
  buttonStyle?: ViewStyle
}>;

export function Button({ title, onPress, buttonStyle }: Props) {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "green",
    borderRadius: 5,
    width: "80%",
    height: 30,
    paddingTop: 3,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
