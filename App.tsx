import React, {useRef, useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import Stopwatch from './src/stopwatch';
import Timer from './src/timer';
import {formatTimeString} from './src/utils/formatTime';

const App: React.FC = () => {
  const [testa, setTesta] = useState(0);
  const test = useRef(null);

  const teste = e => {
    setTesta(e);
  };

  return (
    <SafeAreaView>
      <Timer ref={test} initialTime={86400000} getTime={teste} />
      <Text onPress={() => test.current.startTimer()}>start</Text>
      <Text onPress={() => test.current.pauseTimer()}>pause</Text>
      <Text onPress={() => test.current.resetTimer()}>reset</Text>
      <Text>{formatTimeString(testa)}</Text>
    </SafeAreaView>
  );
};

export default App;
