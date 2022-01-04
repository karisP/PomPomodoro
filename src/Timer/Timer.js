import React from 'react';
import useInterval from '../hooks/useInterval';
import useMedia from '../hooks/useMedia';
import Toggle from '../Toggle/Toggle';
import styles from './Timer.module.css';
import audio from '../media/cheeringperson.mp3';

const Timer = (props) => {
    //when mode is false, break mode but when mode is true, focus mode
    const [audioContext, setAudioContext] = React.useState();
    const [mode, setMode] = React.useState(true);
    const [selectedTimerBtn, setSelectedTimerBtn] = React.useState("");
    const [initialFocusMinutes, setInitialFocusMinutes] = React.useState(1);
    const [initialBreakMinutes, setInitialBreakMinutes] = React.useState(1);
    const [minute, setMinute] = React.useState(mode ? initialFocusMinutes : initialBreakMinutes);
    const [second, setSecond] = React.useState(60);
    const [minuteDelay, setMinuteDelay] = React.useState(null);
    const [secondDelay, setSecondDelay] = React.useState(null);
    const [clickCount, setClickCount] = React.useState(0);
    const timerFinished = (minute === 0 && second === 0);
    useInterval(() => countDownSeconds(), secondDelay);
    useInterval(() => countDownMinutes(), minuteDelay);
    useMedia(audio, audioContext, timerFinished);

    React.useEffect(() => {
        stopTimer();
        setMinute(mode ? initialFocusMinutes : initialBreakMinutes);
        setSecond(60);
        setClickCount(0);
    }, [initialFocusMinutes, initialBreakMinutes, mode]); 

    const countDownMinutes = () => {
        if (minute > 0) {
            return setMinute(minute - 1);
        } else {
            setMinuteDelay(null);
        };
    };

    const countDownSeconds = () => {
        if (second > 0) {
            setSecond(second - 1);
        } else {
            if (timerFinished) {
                stopTimer();
                setMode(!mode);
            } else {
                setSecond(59);
            };
        };
    };

    const startTimer = () => {
        console.log("start timer");
        setAudioContext(new (window.AudioContext || window.webkitAudioContext)());
        setSelectedTimerBtn("start");
        //handles first click immediately subtracting minute
        if (clickCount === 0) {
            setMinute(minute - 1);
            setSecond(second - 1);
            setClickCount(clickCount + 1);
        }
        setSecondDelay(1000);
        setMinuteDelay(60000);
    };

    const stopTimer = () => {
        setSelectedTimerBtn("stop");
        setSecondDelay(null);
        setMinuteDelay(null);
    };

    const clearTimer = () => {
        setSelectedTimerBtn("reset");
        stopTimer();
        setMinute(mode ? initialFocusMinutes : initialBreakMinutes);
        setSecond(60);
        setClickCount(0);
    };

    const selectTime = (num) => {
        clearTimer();
        mode ? setInitialFocusMinutes(num) : setInitialBreakMinutes(num);
    };

    let displayTime = (num) => {
        if (num >= 10 && num !== 60) return num;
        else if (num === 60) return `00`;
        else return `0${parseInt(num)}`;
    };

    const selectedButton = (num) => {
        if ((mode === false && initialBreakMinutes === num) || (mode === true && initialFocusMinutes === num)) {
            return true;
        } else {
            return false;
        };
    };

    return (
        <>
            <Toggle onToggle={() => setMode(!mode)} checked={mode} />
            {mode ?
                <div className={styles.imageContainer}>
                    <div className={styles.image}></div>
                    <div>Focus Time!</div>
                </div>
                :
                <div className={styles.imageContainer}>
                    <div>{props.pomImage !== null ? props.pomImage : null}</div>
                    <div>Take A Break!</div>
                </div>
            }
            <div className={styles.timeDisplay}>{displayTime(minute)} : {displayTime(second)}</div>
            <div className={styles.buttonContainer}>
                <button onClick={startTimer} className={selectedTimerBtn === "start" ? styles.selected : null}>Start</button>
                <button onClick={stopTimer} className={selectedTimerBtn === "stop" ? styles.selected : null}>Stop</button>
                <button onClick={clearTimer} className={selectedTimerBtn === "reset" ? styles.selected : null}>Reset</button>
            </div>
            <div>
                <button
                    className={selectedButton(5) ? styles.selected : null}
                    onClick={() => selectTime(5)}>5 min
                </button>
                <button
                    className={selectedButton(10) ? styles.selected : null}
                    onClick={() => selectTime(10)}>10 min
                </button>
                <button
                    className={selectedButton(15) ? styles.selected : null}
                    onClick={() => selectTime(15)}>15 min
                </button>
                <button
                    className={selectedButton(20) ? styles.selected : null}
                    onClick={() => selectTime(20)}>20 min
                </button>
                <button
                    className={selectedButton(25) ? styles.selected : null}
                    onClick={() => selectTime(25)}>25 min
                </button>
            </div>
        </>
    );
};

export default Timer;