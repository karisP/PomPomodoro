import React from 'react';
import useInterval from '../hooks/useInterval';

const Timer = () => {
    const [minute, setMinute] = React.useState(25)
    const [second, setSecond] = React.useState(60);
    const [minuteDelay, setMinuteDelay] = React.useState(null);
    const [secondDelay, setSecondDelay] = React.useState(null);
    useInterval(() => countDownSeconds(), secondDelay);
    useInterval(() => countDownMinutes(), minuteDelay);

    const countDownMinutes = () => {
        if (minute > 0){
            return setMinute(minute - 1);
        } else {
            stopTimer();
        };
    };

    const countDownSeconds = () => {
        if (second > 0){
            setSecond(second - 1);
        } else {
            setSecond(59);
        };
    };

    const startTimer = () => {
        setSecondDelay(1000);
        setMinuteDelay(60000);
    };

    const stopTimer = () => {
        setSecondDelay(null);
        setMinuteDelay(null);
    };

    let displayTime = (num) => {
        if (num >= 10 && num !== 60) return num;
        else if (num === 60) return `00`;
        else return `0${parseInt(num)}`;
    };

    return (
        <>
            <div>{displayTime(minute)} : {displayTime(second)}</div>
            <button onClick={startTimer}>Start Timer</button>
            <button onClick={stopTimer}>Stop Timer</button>
        </>
    );
};

export default Timer;