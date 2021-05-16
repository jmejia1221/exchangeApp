import React from "react";

// Libs
import classNames from "classnames";

// CSS
import styles from './Input.module.scss';

const Input = ({ placeholder, className, ...res }) => {
    return (
        <input
            className={classNames(styles.input, className)}
            placeholder={placeholder}
            {...res}
        />
    );
};

export default Input;