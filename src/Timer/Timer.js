import React from 'react';
import useInterval from '../hooks/useInterval';

const Timer = (props) => {
    const initialMinutes = 1;
    const [minute, setMinute] = React.useState(initialMinutes);
    const [second, setSecond] = React.useState(60);
    const [minuteDelay, setMinuteDelay] = React.useState(null);
    const [secondDelay, setSecondDelay] = React.useState(null);
    const [clickCount, setClickCount] = React.useState(0);
    useInterval(() => countDownSeconds(), secondDelay);
    useInterval(() => countDownMinutes(), minuteDelay);

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
            if (minute === 0 && second === 0){
                stopTimer();
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
            {minute === 0 && second === 0 ?
                <div>
                    {props.pomImage !== null ? props.pomImage : null}
                    <div>Take A Break!</div>
                </div>
                :
                null
            }
            <div>{displayTime(minute)} : {displayTime(second)}</div>
            <button onClick={startTimer}>Start Timer</button>
            <button onClick={stopTimer}>Stop Timer</button>
            <button onClick={clearTimer}>Clear Timer</button>
        </>
    );
};

export default Timer;