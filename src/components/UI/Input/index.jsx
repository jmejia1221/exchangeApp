import React from "react";

// Libs
import classNames from "classnames";

// CSS
import styles from './Input.module.scss';

const Input = ({ placeholder, className, label, ...res }) => {
    return (
        <div>
            {label && <span className={styles.label}>{label}</span> }
            <input
                className={classNames(styles.input, className)}
                placeholder={placeholder}
                {...res}
            />
        </div>
    );
};

export default Input;