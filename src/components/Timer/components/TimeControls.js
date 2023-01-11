import styles from "../Timer.module.css";

const TimeControls = (props) => {
  return (
    <div className={styles["button-container"]}>
      <button
        onClick={props.startTimer}
        className={props.selectedTimerBtn === "start" ? styles.selected : null}
      >
        ▶︎ Start
      </button>
      <button
        onClick={() => props.stopTimer(true)}
        className={props.selectedTimerBtn === "stop" ? styles.selected : null}
      >
        <span className={styles.stop}></span>
        <span>Stop</span>
      </button>
      <button
        onClick={props.clearTimer}
        className={props.selectedTimerBtn === "reset" ? styles.selected : null}
      >
        <span className={styles.refresh}></span>
        Reset
      </button>
    </div>
  );
};

export default TimeControls;
