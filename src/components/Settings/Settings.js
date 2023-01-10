import React from "react";
import Toggle from "../Toggle/Toggle";
import styles from "./Settings.module.css";

const Settings = (props) => {
  return (
    <div
      className={
        props.settingsOpen
          ? styles.container
          : `${styles.container} ${styles["closed-menu"]}`
      }
    >
      <div className={styles.heading}>
        <button onClick={props.toggleSettingsMenu}>Close</button>
        <p>Settings</p>
      </div>
      <div className={styles.feature}>
        <p>Audio</p>
        <Toggle
          onToggle={() => props.onChangeAudioEnabled(!props.audioEnabled)}
          checked={props.audioEnabled}
          settings
        />
      </div>
      <div className={styles.feature}>
        <p>Confetti</p>
        <Toggle
          onToggle={props.toggleConfettiEnabled}
          checked={props.confettiEnabled}
          settings
        />
      </div>
    </div>
  );
};

export default Settings;
