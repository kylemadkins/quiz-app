import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";

import { QuestionCard } from "../components/QuestionCard";
import { Button } from "../components/ui/Button";
import { useQuizContext } from "../context/QuizContext";
import { GameOverCard } from "../components/GameOverCard";

export default function QuizScreen() {
  const {
    currentQuestionIndex,
    questions,
    onNext,
    gameOver,
    restart,
    secondsLeft,
  } = useQuizContext();

  return (
    <View style={styles.screenContainer}>
      {gameOver ? (
        <LottieView
          source={require("../assets/party.json")}
          style={StyleSheet.absoluteFill}
          autoPlay
        />
      ) : (
        ""
      )}
      <SafeAreaProvider>
        <SafeAreaView style={styles.quizContainer}>
          <Text style={styles.title}>
            Question {currentQuestionIndex + 1}/{questions.length}
          </Text>

          {!gameOver ? (
            <>
              <View>
                <QuestionCard question={questions[currentQuestionIndex]} />
                <Text style={styles.timer}>{secondsLeft} sec</Text>
              </View>
              <Button
                text="Next"
                rightIcon="arrow-right-long"
                onPress={onNext}
              />
            </>
          ) : (
            <>
              <View>
                <GameOverCard />
              </View>
              <Button
                text="Restart"
                rightIcon="rotate-right"
                onPress={restart}
              />
            </>
          )}

          <StatusBar style="auto" />
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#fdfef4",
  },
  quizContainer: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
    zIndex: 10,
  },
  title: {
    textAlign: "center",
    color: "#005055",
  },
  timer: {
    marginVertical: 15,
    textAlign: "center",
    color: "#005055",
    fontWeight: 700,
  },
});
