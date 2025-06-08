import { Text } from "react-native";

import { Card } from "./ui/Card";
import { useQuizContext } from "../context/QuizContext";

export function GameOverCard() {
  const { score, questions } = useQuizContext();

  return (
    <Card title="Well Done!">
      <Text>
        Correct answers: {score}/{questions.length}
      </Text>
    </Card>
  );
}
