import { Text, StyleSheet, Pressable } from "react-native";

export function AnswerOption({
  option,
  isSelected,
  onSelect,
}: {
  option: string;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <Pressable
      style={[styles.answerOption, isSelected && styles.isSelected]}
      onPress={onSelect}
    >
      <Text>{option}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  answerOption: {
    borderWidth: 1,
    borderColor: "lightgray",
    padding: 20,
    borderRadius: 100,
  },
  isSelected: {
    backgroundColor: "#e1f396",
    borderColor: "#e1f396",
  },
});
