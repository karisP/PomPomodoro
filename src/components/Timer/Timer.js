import React from 'react';
import useInterval from '../../hooks/useInterval';
import Toggle from '../Toggle/Toggle';
import styles from './Timer.module.css';
import yayAudio from '../../media/cheeringperson.mp3';
import useAudio from '../../hooks/useAudio';
import confetti from "canvas-confetti";
import gear from "../../media/icons8-settings.svg";
import TimeDisplay from '../TimeDisplay/TimeDisplay';

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
        setSelectedTimerBtn("reset");
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

    return (
        <>
            <Toggle onToggle={() => props.setMode(!mode)} checked={mode} />
            {mode ?
                <div className={styles['image-container']}>
                    <div className={styles.image}></div>
                    <div>Focus Time!</div>
                </div>
                :
                <div className={styles['image-container']}>
                    <div>{props.pomImage === null ? <div className={styles.image}></div> : props.pomImage}</div>
                    <div>Take A Break!</div>
                </div>
            }
            <TimeDisplay
                selectedTimerBtn={selectedTimerBtn}
                selectTime={selectTime}
                value={mode ? initialFocusMinutes : initialBreakMinutes}
                minute={minute}
                second={second}
            />
            <div className={styles['button-container']}>
                <button onClick={startTimer} className={selectedTimerBtn === "start" ? styles.selected : null}>▶︎ Start</button>
                <button onClick={() => stopTimer(true)} className={selectedTimerBtn === "stop" ? `${styles.selected}${styles.stop}` : styles.stop}><span>◼︎</span>Stop</button>
                <button onClick={clearTimer} className={selectedTimerBtn === "reset" ? styles.selected : null}>⏎ Reset</button>
            </div>
            <button className={styles.settings} onClick={() => props.setSettingsOpen(true)}>
                <img src={gear} alt="settings" />
                <span>Settings</span>
            </button>
        </>
    );
};

export default Timer;