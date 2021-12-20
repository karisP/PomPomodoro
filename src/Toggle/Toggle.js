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
            Break
            <label className={styles.switch}>
                <input type="checkbox" onChange={(e) => onChangeToggle(e)} checked={props.checked} />
                <span className={`${styles.slider} ${styles.round}`}></span>
            </label>
            Focus
        </div>
    )
}

export default Toggle;