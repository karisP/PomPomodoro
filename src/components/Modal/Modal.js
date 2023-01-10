import * as React from "react";
import styles from "./Modal.module.css";

const Modal = (props) => {
  return (
    <div className={styles.container} onClick={props.onCloseModal}>
      <div className={styles.message}>
        <div className={styles.close} onClick={props.onCloseModal} />
        <p>Enable audio?</p>
        <div className={styles.buttonContainer}>
          <button onClick={() => props.onChangeAudioEnabled(true)}>Yes</button>
          <button onClick={() => props.onChangeAudioEnabled(false)}>No</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
