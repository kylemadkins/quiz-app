import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import questions from "../data/questions";
import { Question } from "../types/question";
import { useTimer } from "../hooks/useTimer";
import { useBestScore } from "../hooks/useBestScore";

type IQuizContext = {
  questions: Question[];
  currentQuestionIndex: number;
  selectedAnswer: string;
  setSelectedAnswer: Dispatch<SetStateAction<string>>;
  onNext: () => void;
  score: number;
  gameOver: boolean;
  restart: () => void;
  secondsLeft: number;
  bestScore: number;
};

const QuizContext = createContext<IQuizContext>({
  questions,
  currentQuestionIndex: 0,
  selectedAnswer: "",
  setSelectedAnswer: () => {},
  onNext: () => {},
  score: 0,
  gameOver: false,
  restart: () => {},
  secondsLeft: 20,
  bestScore: 0,
});

export function QuizProvider({ children }: PropsWithChildren) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const { secondsLeft, clearTimer, restartTimer } = useTimer(20);
  const { bestScore, setBestScore } = useBestScore();

  const onNext = useCallback(() => {
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore((curr) => curr + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((curr) => curr + 1);
      restartTimer();
    } else {
      setGameOver(true);
      clearTimer();
    }
  }, [selectedAnswer, currentQuestionIndex, clearTimer, restartTimer]);

  const restart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer("");
    setScore(0);
    setGameOver(false);
    restartTimer();
  };

  useEffect(() => {
    if (secondsLeft <= 0) onNext();
  }, [secondsLeft, onNext]);

  useEffect(() => {
    if (score > bestScore) setBestScore(score);
  }, [score, bestScore, setBestScore]);

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
        secondsLeft,
        bestScore,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export const useQuizContext = () => useContext(QuizContext);
