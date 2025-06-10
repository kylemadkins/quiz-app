import { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";

export function Card({
  title,
  children,
}: PropsWithChildren<{
  title?: string;
}>) {
  return (
    <View style={styles.card}>
      {title ? <Text style={styles.cardTitle}>{title}</Text> : ""}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    paddingVertical: 40,
    gap: 20,

    // Shaddow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 500,
    lineHeight: 30,
  },
});
