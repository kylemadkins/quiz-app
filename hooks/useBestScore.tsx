import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BEST_SCORE_KEY = "best-score";

export function useBestScore() {
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    const getBestScore = async () => {
      try {
        const score = await AsyncStorage.getItem(BEST_SCORE_KEY);

        if (score) {
          try {
            setBestScore(parseInt(score, 10));
          } catch (err) {
            console.log(err);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    getBestScore();
  }, []);

  useEffect(() => {
    const storeBestScore = async () => {
      try {
        await AsyncStorage.setItem(BEST_SCORE_KEY, String(bestScore));
      } catch (err) {
        console.log(err);
      }
    };

    storeBestScore();
  }, [bestScore]);

  return { bestScore, setBestScore };
}
