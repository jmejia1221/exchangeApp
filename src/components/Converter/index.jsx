import React, {useEffect, useState} from "react";

// Service
import ratesApi from '../../services/converter_service';

// Libs
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSync, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

// Components
import Input from "../UI/Input";
import Select from "../UI/Select";

// CSS
import styles from './converter.module.scss';

const Converter = ({ id, data, isRemovable, removeHandler }) => {
    const [exchangeSource, setExchangeSource] = useState('');
    const [exchangeTarget, setExchangeTarget] = useState('');

    const [baseRate, setBaseRate] = useState('EUR');
    const [targetBaseRate, setTargetBaseRate] = useState('USD');

    const [dateValue, setDateValue] = useState('latest');

    let ratesKey = [];

    useEffect(() => {
        if (dateValue !== 'latest') {
            baseApi(exchangeSource, baseRate, targetBaseRate, 'source');
        }
    }, [dateValue])

    const baseApi = async (value, base, symbol, sourceType) => {
        try {
            const data = await ratesApi.get(`/${dateValue}`, {
                params: {
                    base,
                    symbols: symbol
                }
            });
            const computeRate = value * data.data.rates[symbol];
            if (sourceType === 'target') setExchangeSource(computeRate);
            if (sourceType === 'source') setExchangeTarget(computeRate);
        } catch (err) {
            console.error(err);
        }
    }

    const swapExchangeHandler = () => {
        setBaseRate(targetBaseRate);
        setTargetBaseRate(baseRate);
        setExchangeTarget(exchangeSource);
        setExchangeSource(exchangeTarget);
    }

    const exchangeHandler = (e) => {
        const { name, value } = e.target;
        let base = baseRate;
        let symbol = targetBaseRate;

        if (name === 'target') {
            setExchangeTarget(value);
        }
        if (name === 'source') {
            setExchangeSource(value);
            base = targetBaseRate;
            symbol = baseRate;
        }

        if (!value) {
            setExchangeTarget('');
            setExchangeSource('');
            return;
        }

        baseApi(value, symbol, base, name);
    }

    // Change rate type
    const rateHandler = (rate, type) => {
        if (type === 'source') setBaseRate(rate);
        if (type === 'target') setTargetBaseRate(rate);
    }

    // Change date rate
    const dateHandler = (e) => {
        setDateValue(e.target.value);
    }

    if (data?.rates) {
        ratesKey = Object.keys(data.rates).map(key => {
            return {label: key, value: key}
        });
    }
    return (
        <section className={classNames(styles.container, {[styles.isRemovable]: isRemovable})}>
            <header className={styles.header}>
                <Input label="Change date conversion" type="date" onChange={dateHandler} />
                {isRemovable && (
                    <span
                        className={styles.removeConverter}
                        onClick={() => removeHandler(id)}
                    >
                        <FontAwesomeIcon icon={faTrashAlt} />
                        <span className={styles.text}>Remove converter</span>
                    </span>
                )}
            </header>
            <section className={styles.body}>
                <div className={styles.source}>
                    <header>
                        <Select
                            placeholder="From"
                            items={ratesKey}
                            value={baseRate}
                            onchange={(v) => rateHandler(v, 'source')} />
                    </header>
                    <Input
                        placeholder="€100"
                        className={styles.input}
                        name="source"
                        value={exchangeSource}
                        onChange={exchangeHandler}
                        type="number" />
                </div>
                <div className={styles.swapConverter}>
                    <button className={styles.swapButton} onClick={swapExchangeHandler}>
                        <FontAwesomeIcon icon={faSync} />
                    </button>
                </div>
                <div className={styles.target}>
                    <header>
                        <Select
                            placeholder="To"
                            items={ratesKey}
                            value={targetBaseRate}
                            onchange={(value) => rateHandler(value, 'target')} />
                    </header>
                    <Input
                        placeholder="$121"
                        className={styles.input}
                        name="target"
                        value={exchangeTarget}
                        onChange={exchangeHandler}
                        type="number" />
                </div>
            </section>
        </section>
    );
};

export default Converter;