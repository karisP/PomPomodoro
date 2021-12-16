import * as React from 'react';
import styles from './Toggle.module.css';

const Toggle = (props) => {
    //const [checked, setChecked] = React.useState(false);

    const onChangeToggle = (e) => {
        //setChecked(e.currentTarget.checked);
        props.onToggle(e.currentTarget.checked);
    };

    return (
        <div className={styles.toggle}>
            Focus
            <label className={styles.switch}>
                <input type="checkbox" onChange={(e) => onChangeToggle(e)} checked={props.checked} />
                <span className={`${styles.slider} ${styles.round}`}></span>
            </label>
            Break
        </div>
    )
}

export default Toggle;