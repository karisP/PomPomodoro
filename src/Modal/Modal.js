import * as React from 'react';
import styles from './Modal.module.css';

const Modal = (props) => {

    return (
        <div className={styles.container} onClick={() => props.setCloseModal(true)}>
            <div className={styles.message}>
                <div className={styles.close} onClick={() => props.setCloseModal(true)} />
                <p>Enable audio?</p>
                <div className={styles.buttonContainer}>
                    <button onClick={() => props.setAudioEnabled(true)}>Yes</button>
                    <button onClick={() => props.setAudioEnabled(false)}>No</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;