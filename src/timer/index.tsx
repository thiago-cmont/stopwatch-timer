import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {Animated, Text, View} from 'react-native';
import {INTERVAL} from '../constants';
import {formatTimeString} from '../utils/formatTime';
const Timer: React.FC = ({
  getTime,
  initialTime,
  onMinuteChange,
  onSecondChange,
  onHourChange,
  innerRef,
}) => {
  const [started, setStarted] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [timeToFinish, setTimeToFinish] = useState<number>(initialTime);
  const [parcialTime, setParcialTime] = useState<number>(0);
  const [paused, setPaused] = useState<boolean>(false);
  const [timer, setTimer] = useState<NodeJS.Timer | null>();
  const oldHour = useRef<number | null>(null);
  const oldMinute = useRef<number | null>(null);
  const oldSecond = useRef<number | null>(null);
  const test = useRef(0);

  const timerHandler = (time: number) => {
    test.current = time;
    getTime(timeToFinish - time);
    if (oldHour.current === null) {
      oldHour.current = Math.floor(time / 3600000);
    } else if (oldMinute.current === null) {
      oldMinute.current = Math.floor(time / 60000);
    } else if (oldSecond.current === null) {
      oldSecond.current = Math.floor(time / 1000);
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
        onSecondChange?.();
        oldSecond.current = null;
      } else if (minuteTimeStamp - oldMinute.current >= 1) {
        onMinuteChange?.();
        oldMinute.current = null;
      } else if (hourTimeStamp - oldHour.current >= 1) {
        onHourChange?.();
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
  };

  useImperativeHandle(innerRef, () => ({
    startTimer,
    resetTimer,
    pauseTimer,
  }));

  return (
    <View ref={innerRef}>
      <Text>Loading{formatTimeString(timeToFinish - elapsedTime)}</Text>
      <Animated.View>
        <Text>a</Text>
      </Animated.View>
    </View>
  );
};

const TimerWithRef = forwardRef((props, ref) => (
  <Timer innerRef={ref} {...props} />
));

export default TimerWithRef;
