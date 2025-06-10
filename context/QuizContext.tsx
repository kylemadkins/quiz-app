import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import questions from "../data/questions";
import { Question } from "../types/question";

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
});

export function QuizProvider({ children }: PropsWithChildren) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(20);
  const intervalId = useRef<ReturnType<typeof setInterval>>(null);

  const onNext = useCallback(() => {
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore((curr) => curr + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((curr) => curr + 1);
    } else {
      setGameOver(true);
      if (intervalId.current !== null) clearInterval(intervalId.current);
      intervalId.current = null;
    }

    setSecondsLeft(20);
  }, [selectedAnswer, currentQuestionIndex]);

  const restart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer("");
    setScore(0);
    setSecondsLeft(20);
    setGameOver(false);
    intervalId.current = setInterval(
      () => setSecondsLeft((curr) => curr - 1),
      1000
    );
  };

  useEffect(() => {
    intervalId.current = setInterval(
      () => setSecondsLeft((curr) => curr - 1),
      1000
    );

    return () => {
      if (intervalId.current !== null) clearInterval(intervalId.current);
      intervalId.current = null;
    };
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) onNext();
  }, [secondsLeft, onNext]);

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
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export const useQuizContext = () => useContext(QuizContext);
