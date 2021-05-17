import React from "react";

// CSS
import styles from './Button.module.scss';

const Button = ({ children, onClick }) => {
    return (
        <button onClick={onClick} className={styles.content}>
            {children}
        </button>
    );
};

export default Button;