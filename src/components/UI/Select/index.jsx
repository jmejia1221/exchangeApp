import React from "react";

// Lib
import _ from 'lodash';

const Select = ({ items=[], onchange, value }) => {
    let options = null;

    if (items.length) {
        options = items.map(option => {
            return (
                <option
                    key={_.uniqueId()}
                    value={option.value}>
                    {option.label}
                </option>
            )
        })
    }

    return (
        <select value={value} onChange={onchange}>
            {options}
        </select>
    );
};

export default Select;