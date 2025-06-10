import { Text } from "react-native";

import { Card } from "./ui/Card";
import { useQuizContext } from "../context/QuizContext";

export function GameOverCard() {
  const { score, questions, bestScore } = useQuizContext();

  return (
    <Card title="Finished!">
      <Text>
        Correct answers: {score}/{questions.length}
      </Text>
      <Text>Best score: {bestScore}</Text>
    </Card>
  );
}
