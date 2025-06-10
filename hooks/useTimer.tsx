import { useEffect, useRef, useState } from "react";

export function useTimer(initialSeconds: number) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const intervalId = useRef<ReturnType<typeof setInterval>>(null);

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

  const clearTimer = () => {
    if (intervalId.current !== null) clearInterval(intervalId.current);
    intervalId.current = null;
  };

  const restartTimer = () => {
    clearTimer();
    setSecondsLeft(initialSeconds);
    intervalId.current = setInterval(
      () => setSecondsLeft((curr) => curr - 1),
      1000
    );
  };

  return { secondsLeft, clearTimer, restartTimer };
}
