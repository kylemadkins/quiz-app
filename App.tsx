import { QuizProvider } from "./context/QuizContext";
import QuizScreen from "./screens/QuizScreen";

export default function App() {
  return (
    <QuizProvider>
      <QuizScreen />
    </QuizProvider>
  );
}
