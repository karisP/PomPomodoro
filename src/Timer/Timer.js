import React from 'react';
import useInterval from '../hooks/useInterval';
import Toggle from '../Toggle/Toggle';
import './Timer.module.css';
import audio from '../media/cheeringperson.mp3';

const Timer = (props) => {
    const [mode, setMode] = React.useState(false);
    const [initialMinutes, setInitialMinutes] = React.useState(1);
    const [minute, setMinute] = React.useState(initialMinutes);
    const [second, setSecond] = React.useState(60);
    const [minuteDelay, setMinuteDelay] = React.useState(null);
    const [secondDelay, setSecondDelay] = React.useState(null);
    const [clickCount, setClickCount] = React.useState(0);
    useInterval(() => countDownSeconds(), secondDelay);
    useInterval(() => countDownMinutes(), minuteDelay);
    const timerFinished = (minute === 0 && second === 0);

    React.useEffect(() => {
        setMinute(initialMinutes);
    }, [initialMinutes]);

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
        setMinute(initialMinutes);
        setSecond(60);
        setClickCount(0);
    };

    let displayTime = (num) => {
        if (num >= 10 && num !== 60) return num;
        else if (num === 60) return `00`;
        else return `0${parseInt(num)}`;
    };

    return (
        <>
            <Toggle onToggle={() => setMode(!mode)} checked={mode}/>
            {timerFinished ?
                <div>
                    {props.pomImage !== null ? props.pomImage : null}
                    <div>Take A Break!</div>
                </div>
                :
                null
            }
            <div>{displayTime(minute)} : {displayTime(second)}</div>
            <div>
                <button onClick={startTimer}>Start</button>
                <button onClick={stopTimer}>Stop</button>
                <button onClick={clearTimer}>Reset</button>
            </div>
            <div>
                <button onClick={() => setInitialMinutes(5)}>5 min</button>
                <button onClick={() => setInitialMinutes(10)}>10 min</button>
                <button onClick={() => setInitialMinutes(15)}>15 min</button>
                <button onClick={() => setInitialMinutes(20)}>20 min</button>
                <button onClick={() => setInitialMinutes(25)}>25 min</button>
            </div>
        </>
    );
};

export default Timer;