import { ComponentProps, ReactNode } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

export function Button({
  text,
  rightIcon,
  ...pressableProps
}: { text: string; rightIcon: ReactNode } & ComponentProps<typeof Pressable>) {
  return (
    <Pressable {...pressableProps} style={styles.button}>
      <Text style={styles.buttonText}>{text}</Text>
      <FontAwesome6
        name={rightIcon}
        size={16}
        color="white"
        style={styles.buttonIcon}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#005055",
    padding: 20,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: 500,
    fontSize: 16,
    letterSpacing: 1.5,
  },
  buttonIcon: {
    position: "absolute",
    right: 20,
  },
});
