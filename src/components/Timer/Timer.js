import React, { useCallback } from "react";
import useInterval from "../../hooks/useInterval";
import yayAudio from "../../media/cheeringperson.mp3";
import useAudio from "../../hooks/useAudio";
import confetti from "canvas-confetti";
import TimeDisplay from "./components/TimeDisplay";
import TimeControls from "./components/TimeControls";

const Timer = ({ mode, toggleMode, confettiEnabled, audioEnabled }) => {
  const blankAudio =
    "data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";
  const [selectedTimerBtn, setSelectedTimerBtn] = React.useState("");
  const [initialFocusMinutes, setInitialFocusMinutes] = React.useState(25);
  const [initialBreakMinutes, setInitialBreakMinutes] = React.useState(5);
  const [minute, setMinute] = React.useState(
    mode ? initialFocusMinutes : initialBreakMinutes
  );
  const [second, setSecond] = React.useState(60);
  const [minuteDelay, setMinuteDelay] = React.useState(null);
  const [secondDelay, setSecondDelay] = React.useState(null);
  const [clickCount, setClickCount] = React.useState(0);
  const timerFinished = minute === 0 && second === 0;
  useInterval(() => countDownSeconds(), secondDelay);
  useInterval(() => countDownMinutes(), minuteDelay);
  useAudio(blankAudio, yayAudio, timerFinished, audioEnabled);

  const startTimer = useCallback(() => {
    setSelectedTimerBtn("start");
    //handles first click immediately subtracting minute
    if (clickCount === 0) {
      setMinute(minute - 1);
      setSecond(second - 1);
      setClickCount(clickCount + 1);
    }
    setSecondDelay(1000);
    setMinuteDelay(60000);
  }, [clickCount, minute, second]);

  const stopTimer = useCallback((onButtonPress) => {
    if (onButtonPress) {
      setSelectedTimerBtn("stop");
    }
    setSecondDelay(null);
    setMinuteDelay(null);
  }, []);

  const clearTimer = useCallback(() => {
    setSelectedTimerBtn("reset");
    stopTimer(false);
    setMinute(mode ? initialFocusMinutes : initialBreakMinutes);
    setSecond(60);
    setClickCount(0);
  }, [initialFocusMinutes, initialBreakMinutes, mode, stopTimer]);

  React.useEffect(() => {
    stopTimer(false);
    setMinute(mode ? initialFocusMinutes : initialBreakMinutes);
    setSecond(60);
    setClickCount(0);
    setSelectedTimerBtn("reset");
  }, [initialFocusMinutes, initialBreakMinutes, mode, stopTimer]);

  const countDownMinutes = useCallback(() => {
    if (minute > 0) {
      return setMinute(minute - 1);
    } else {
      setMinuteDelay(null);
    }
  }, [minute]);

  const countDownSeconds = useCallback(() => {
    if (second > 0) {
      setSecond(second - 1);
    } else {
      if (timerFinished) {
        if (confettiEnabled) confetti();
        stopTimer(false);
        setTimeout(() => toggleMode(!mode), 2500);
      } else {
        setSecond(59);
      }
    }
  }, [second, confettiEnabled, mode, toggleMode, timerFinished, stopTimer]);

  const selectTime = useCallback(
    (num) => {
      clearTimer();
      mode ? setInitialFocusMinutes(num) : setInitialBreakMinutes(num);
    },
    [mode, clearTimer]
  );

  return (
    <>
      <TimeDisplay
        selectedTimerBtn={selectedTimerBtn}
        selectTime={selectTime}
        value={mode ? initialFocusMinutes : initialBreakMinutes}
        minute={minute}
        second={second}
      />
      <TimeControls
        startTimer={startTimer}
        stopTimer={stopTimer}
        clearTimer={clearTimer}
        selectedTimerBtn={selectedTimerBtn}
      />
    </>
  );
};

export default Timer;
