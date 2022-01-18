import React from 'react';
import styles from '../Timer/Timer.module.css';

const TimeDisplay = (props) => {
    const [value, setValue] = React.useState();
    React.useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    const minuteOptions = [1, 5, 10, 15, 20, 25, 30, 35, 40, 45];
    const onChangeMinute = (e) => {
        props.selectTime(e.currentTarget.value);
    }

    let displayTime = (num) => {
        if (num >= 10 && num !== 60) return num;
        else if (num === 60) return `00`;
        else return `0${parseInt(num)}`;
    };

    return (
        props.selectedTimerBtn === "reset" ?
            <div className={styles.timeDisplay}>
                <select autoFocus onChange={(e) => onChangeMinute(e)} value={value}>
                    {minuteOptions.map((min) => {
                        return (
                            <option key={min} value={min}>{displayTime(min)}</option>
                        )
                    })}
                </select>
                <span>&nbsp;min</span>
            </div>
            :
            <div className={styles.timeDisplay}>
                <div>{displayTime(props.minute)}</div>
                <span>:</span>
                <div>{displayTime(props.second)}</div>
            </div>
    
    )
}

export default TimeDisplay;