import { AnswerOption } from "./AnswerOption";
import { Question } from "../types/question";
import { Card } from "./ui/Card";
import { useQuizContext } from "../context/QuizContext";

export function QuestionCard({ question }: { question: Question }) {
  const { selectedAnswer, setSelectedAnswer } = useQuizContext();

  return (
    <Card title={question.title}>
      {question.options.map((option, index) => (
        <AnswerOption
          key={option + index}
          option={option}
          isSelected={option === selectedAnswer}
          onSelect={() => setSelectedAnswer(option)}
        />
      ))}
    </Card>
  );
}
