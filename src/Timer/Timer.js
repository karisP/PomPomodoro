import React from 'react';
import useInterval from '../hooks/useInterval';
import Toggle from '../Toggle/Toggle';
import styles from './Timer.module.css';
import yayAudio from '../media/cheeringperson.mp3';
import useAudio from '../hooks/useAudio';
import confetti from "canvas-confetti";

const Timer = (props) => {
    const mode = props.mode;
    const blankAudio = "data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";
    const [selectedTimerBtn, setSelectedTimerBtn] = React.useState("");
    const [initialFocusMinutes, setInitialFocusMinutes] = React.useState(25);
    const [initialBreakMinutes, setInitialBreakMinutes] = React.useState(5);
    const [minute, setMinute] = React.useState(mode ? initialFocusMinutes : initialBreakMinutes);
    const [second, setSecond] = React.useState(60);
    const [minuteDelay, setMinuteDelay] = React.useState(null);
    const [secondDelay, setSecondDelay] = React.useState(null);
    const [clickCount, setClickCount] = React.useState(0);
    const timerFinished = (minute === 0 && second === 0);
    useInterval(() => countDownSeconds(), secondDelay);
    useInterval(() => countDownMinutes(), minuteDelay);
    useAudio(blankAudio, yayAudio, timerFinished, props.audioEnabled);

    React.useEffect(() => {
        stopTimer(false);
        setMinute(mode ? initialFocusMinutes : initialBreakMinutes);
        setSecond(60);
        setClickCount(0);
        setSelectedTimerBtn("");
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
                if (props.confettiEnabled) confetti();
                stopTimer(false);
                setTimeout(() => props.setMode(!mode), 2500);
            } else {
                setSecond(59);
            };
        };
    };

    const startTimer = () => {
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

    const stopTimer = (onButtonPress) => {
        if (onButtonPress) {
            setSelectedTimerBtn("stop");
        }
        setSecondDelay(null);
        setMinuteDelay(null);
    };

    const clearTimer = () => {
        setSelectedTimerBtn("reset");
        stopTimer(false);
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
            <Toggle onToggle={() => props.setMode(!mode)} checked={mode} />
            {mode ?
                <div className={styles.imageContainer}>
                    <div className={styles.image}></div>
                    <div>Focus Time!</div>
                </div>
                :
                <div className={styles.imageContainer}>
                    <div>{props.pomImage === null ? <div className={styles.image}></div> : props.pomImage}</div>
                    <div>Take A Break!</div>
                </div>
            }
            <div className={styles.timeDisplay}>{displayTime(minute)} : {displayTime(second)}</div>
            <div className={styles.buttonContainer}>
                <button onClick={startTimer} className={selectedTimerBtn === "start" ? styles.selected : null}>Start</button>
                <button onClick={() => stopTimer(true)} className={selectedTimerBtn === "stop" ? styles.selected : null}>Stop</button>
                <button onClick={clearTimer} className={selectedTimerBtn === "reset" ? styles.selected : null}>Reset</button>
                <button className={styles.settings} onClick={() => props.setSettingsOpen(true)}>
                    <img src="https://img.icons8.com/external-prettycons-lineal-color-prettycons/49/000000/external-settings-essentials-prettycons-lineal-color-prettycons-3.png" alt="settings" />
                </button>
            </div>
            <div>
                <button
                    className={selectedButton(1) ? styles.selected : null}
                    onClick={() => selectTime(1)}>1 min
                </button>
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