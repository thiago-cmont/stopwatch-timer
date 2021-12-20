import React, {useRef, useState} from 'react';
import {Text} from 'react-native';
import {INTERVAL} from '../constants';
import {formatTimeString} from '../utils/formatTime';
const Stopwatch: React.FC = () => {
  const [started, setStarted] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [parcialTime, setParcialTime] = useState<number>(0);
  const [paused, setPaused] = useState<boolean>(false);
  const [laps, setLaps] = useState<string[]>([]);
  const [timer, setTimer] = useState<NodeJS.Timer | null>();
  const oldHour = useRef<number | null>(null);
  const oldMinute = useRef<number | null>(null);
  const oldSecond = useRef<number | null>(null);
  const [isUpdatingSecond, setIsUpdatingSecond] = useState<boolean>(false);
  const [isUpdatingMinute, setIsUpdatingMinute] = useState<boolean>(false);
  const [isUpdatingHour, setIsUpdatingHour] = useState<boolean>(false);

  // const isUpdatingSecond = useRef<boolean>(false);

  const timerHandler = (time: number) => {
    if (oldHour.current === null) {
      oldHour.current = Math.floor(time / 3600000);
      if (isUpdatingHour) {
        setIsUpdatingHour(false);
      }
    } else if (oldMinute.current === null) {
      oldMinute.current = Math.floor(time / 60000);
      if (isUpdatingMinute) {
        setIsUpdatingMinute(false);
      }
    } else if (oldSecond.current === null) {
      oldSecond.current = Math.floor(time / 1000);
      if (isUpdatingSecond) {
        setIsUpdatingSecond(false);
      }
    }

    if (
      oldHour.current !== null &&
      oldMinute.current !== null &&
      oldSecond.current !== null
    ) {
      const hourTimeStamp = Math.floor(time / 3600000);
      const minuteTimeStamp = Math.floor(time / 60000);
      const secondTimeStamp = Math.floor(time / 1000);

      if (secondTimeStamp - oldSecond.current >= 1) {
        setIsUpdatingSecond(true);
        oldSecond.current = null;
      } else if (minuteTimeStamp - oldMinute.current >= 1) {
        setIsUpdatingMinute(true);
        oldMinute.current = null;
      } else if (hourTimeStamp - oldHour.current >= 1) {
        setIsUpdatingHour(true);
        oldHour.current = 0;
      }
    }
    setElapsedTime(time);
  };

  const startTimer = () => {
    if (!started || paused) {
      const startTime = new Date().getTime();
      setStarted(true);
      if (paused) {
        setPaused(false);
      }
      const interval = setInterval(() => {
        timerHandler(new Date().getTime() - startTime + parcialTime);
      }, INTERVAL);
      setTimer(interval);
    }
  };

  const pauseTimer = () => {
    if (!paused) {
      if (timer) {
        clearTimeout(timer);
      }
      setParcialTime(elapsedTime);
      setTimer(null);
      setPaused(true);
      setLaps([...laps, formatTimeString(elapsedTime)]);
    } else {
      startTimer();
    }
  };

  const resetTimer = () => {
    if (timer) {
      clearTimeout(timer);
    }
    setElapsedTime(0);
    setParcialTime(0);
    setStarted(false);
    setTimer(null);
    setLaps([]);
  };

  return (
    <>
      <Text>Loading{formatTimeString(elapsedTime)}</Text>
      <Text onPress={() => startTimer()}>Start</Text>
      <Text onPress={() => pauseTimer()}>pause</Text>
      <Text onPress={() => resetTimer()}>reset</Text>
      {laps.map(lap => {
        return <Text key={lap}>{lap}</Text>;
      })}
    </>
  );
};

export default Stopwatch;
