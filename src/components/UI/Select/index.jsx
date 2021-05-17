import React, {useRef, useState} from "react";

// Lib
import _ from 'lodash';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSortDown, faSortUp} from "@fortawesome/free-solid-svg-icons";

// CSS
import styles from './Select.module.scss';
import useOnclickOutside from "../../../hooks/useOnclickOutside";
import classNames from "classnames";

const Select = ({ items=[], onchange, value, defaultValue }) => {
    const [toggleSelect, setToggleSelect] = useState(false);
    const selectRef = useRef(null);
    useOnclickOutside(selectRef, () => setToggleSelect(false));

    let options = null;
    if (items.length) {
        options = items.map(option => {
            return (
                <li
                    onClick={() => {
                        setToggleSelect(false);
                        onchange(option.value);
                    }}
                    key={_.uniqueId()}
                    value={option.value}>
                    {option.label}
                </li>
            )
        })
    }

    const selectHandler = () => {
        setToggleSelect(prevState => !prevState);
    }

    return (
        <div ref={selectRef} className={classNames(styles.content, {[styles.selectFocused]: toggleSelect})}>
            <span className={styles.holder} onClick={selectHandler}>
                {value || defaultValue}
                <span className={styles.icon}>
                    {!toggleSelect && <FontAwesomeIcon icon={faSortDown} />}
                    {toggleSelect && <FontAwesomeIcon icon={faSortUp} />}
                </span>
            </span>
            {toggleSelect && (
                <ul className={styles.list}>
                    {options}
                </ul>
            )}
        </div>
    );
};

export default Select;