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
    borderRadius: 12,
    width: "100%",
    height: 30,
    minWidth: 30,
    alignItems: 'center',
    margin: 5,
    paddingTop: 3,
    padding: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
