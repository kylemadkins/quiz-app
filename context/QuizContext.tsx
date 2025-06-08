import { createContext, PropsWithChildren, useContext, useState } from "react";

import questions from "../data/questions";
import { Question } from "../types/question";

type QuizContext = {
  questions: Question[];
  currentQuestionIndex: number;
  selectedAnswer: string;
  setSelectedAnswer: (answer: string) => void;
  onNext: () => void;
  score: number;
  gameOver: boolean;
  restart: () => void;
};

const QuizContext = createContext<QuizContext>({
  questions,
  currentQuestionIndex: 0,
  selectedAnswer: "",
  setSelectedAnswer: () => {},
  onNext: () => {},
  score: 0,
  gameOver: false,
  restart: () => {},
});

export function QuizProvider({ children }: PropsWithChildren<{}>) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const onNext = () => {
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore((curr) => curr + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((curr) => curr + 1);
    } else {
      setGameOver(true);
    }
  };

  const restart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer("");
    setScore(0);
    setGameOver(false);
  };

  return (
    <QuizContext.Provider
      value={{
        questions,
        currentQuestionIndex,
        selectedAnswer,
        setSelectedAnswer,
        onNext,
        score,
        gameOver,
        restart,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export const useQuizContext = () => useContext(QuizContext);
