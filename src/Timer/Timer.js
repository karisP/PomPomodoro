import React from 'react';
import useInterval from '../hooks/useInterval';
import Toggle from '../Toggle/Toggle';
import styles from './Timer.module.css';
import audio from '../media/cheeringperson.mp3';
import studyPom from '../media/study_pom.jpeg';

const Timer = (props) => {
    //when mode is false, break mode but when mode is true, focus mode
    const [mode, setMode] = React.useState(true);
    const [initialFocusMinutes, setInitialFocusMinutes] = React.useState(25);
    const [initialBreakMinutes, setInitialBreakMinutes] = React.useState(5);
    const [minute, setMinute] = React.useState(mode ? initialFocusMinutes : initialBreakMinutes);
    const [second, setSecond] = React.useState(60);
    const [minuteDelay, setMinuteDelay] = React.useState(null);
    const [secondDelay, setSecondDelay] = React.useState(null);
    const [clickCount, setClickCount] = React.useState(0);
    useInterval(() => countDownSeconds(), secondDelay);
    useInterval(() => countDownMinutes(), minuteDelay);
    const timerFinished = (minute === 0 && second === 0);

    React.useEffect(() => {
        setMinute(mode ? initialFocusMinutes : initialBreakMinutes);
    }, [initialFocusMinutes, initialBreakMinutes, mode]);

    const playSound = () => {
        let alarm = new Audio(audio);
        alarm.play();
    };

    const countDownMinutes = () => {
        if (minute > 0){
            return setMinute(minute - 1);
        } else {
            setMinuteDelay(null);
        };
    };

    const countDownSeconds = () => {
        if (second > 0){
            setSecond(second - 1);
        } else {
            if (timerFinished){
                stopTimer();
                setMode(!mode);
                playSound();
            } else {
                setSecond(59);
            };
        };
    };

    const startTimer = () => {
        //handles first click immediately subtracting minute
        if (clickCount === 0){
            setMinute(minute - 1);
            setSecond(second - 1);
            setClickCount(clickCount + 1);
        }
        setSecondDelay(1000);
        setMinuteDelay(60000);
    };

    const stopTimer = () => {
        setSecondDelay(null);
        setMinuteDelay(null);
    };

    const clearTimer = () => {
        stopTimer();
        setMinute(mode ? initialFocusMinutes : initialBreakMinutes);
        setSecond(60);
        setClickCount(0);
    };

    let displayTime = (num) => {
        if (num >= 10 && num !== 60) return num;
        else if (num === 60) return `00`;
        else return `0${parseInt(num)}`;
    };

    const selectedButton = (num) => {
        if ((mode === false && initialBreakMinutes === num) || (mode === true && initialFocusMinutes === num)){
            return true;
        } else {
            return false;
        };
    };

    return (
        <>
            <Toggle onToggle={() => setMode(!mode)} checked={mode}/>
            {mode === false ?
                <div>
                    {props.pomImage !== null ? props.pomImage : null}
                    <div>Take A Break!</div>
                </div>
                :
                <div>
                    <img src={studyPom} alt="study pomeranian" width="147px" height="219.75px"/>
                    <div>Focus Time!</div>
                </div>
            }
            <div>{displayTime(minute)} : {displayTime(second)}</div>
            <div>
                <button onClick={startTimer}>Start</button>
                <button onClick={stopTimer}>Stop</button>
                <button onClick={clearTimer}>Reset</button>
            </div>
            <div>
                <button 
                    className={selectedButton(5) ? styles.selected : null}
                    onClick={mode ? () => setInitialFocusMinutes(5) : () => setInitialBreakMinutes(5)}>5 min
                </button>
                <button
                    className={selectedButton(10) ? styles.selected : null}
                    onClick={mode ? () => setInitialFocusMinutes(10) : () => setInitialBreakMinutes(10)}>10 min
                </button>
                <button
                    className={selectedButton(15) ? styles.selected : null}
                    onClick={mode ? () => setInitialFocusMinutes(15) : () => setInitialBreakMinutes(15)}>15 min
                </button>
                <button
                    className={selectedButton(20) ? styles.selected : null}
                    onClick={mode ? () => setInitialFocusMinutes(20) : () => setInitialBreakMinutes(20)}>20 min
                </button>
                <button 
                    className={selectedButton(25) ? styles.selected : null}
                    onClick={mode ? () => setInitialFocusMinutes(25) : () => setInitialBreakMinutes(25)}>25 min
                </button>
            </div>
        </>
    );
};

export default Timer;