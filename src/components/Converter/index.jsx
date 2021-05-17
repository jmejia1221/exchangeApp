import React, {useEffect, useState} from "react";

// Service
import ratesApi from '../../services/converter_service';

// Libs
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSync} from "@fortawesome/free-solid-svg-icons";

// Components
import Input from "../UI/Input";

// CSS
import styles from './converter.module.scss';
import Select from "../UI/Select";

const Converter = ({ data }) => {
    const [exchangeSource, setExchangeSource] = useState(0);
    const [exchangeTarget, setExchangeTarget] = useState(0);

    const [baseRate, setBaseRate] = useState('EUR');
    const [targetBaseRate, setTargetBaseRate] = useState('USD');

    const [dateValue, setDateValue] = useState('latest');

    let ratesKey = [];

    useEffect(() => {
        if (dateValue !== 'latest') {
            baseApi(exchangeSource, targetBaseRate, baseRate, 'source');
        }
    }, [dateValue])

    const baseApi = async (value, base, symbol, sourceType) => {
        const data = await ratesApi.get(`/${dateValue}?base=${base}&symbols=${symbol}`);
        const computeRate = value * data.data.rates[symbol];
        if (sourceType === 'target') setExchangeSource(computeRate)
        if (sourceType === 'source') setExchangeTarget(computeRate)
    }

    const swapExchangeHandler = () => {
        setBaseRate(targetBaseRate)
        setTargetBaseRate(baseRate)
        setExchangeTarget(exchangeSource)
        setExchangeSource(exchangeTarget)
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

        if (!value) return;
        baseApi(value, base, symbol, name);
    }

    const rateHandler = (rate, type) => {
        if (type === 'source') setBaseRate(rate);
        if (type === 'target') setTargetBaseRate(rate);
    }

    const dateHandler = (e) => {
        setDateValue(e.target.value);
    }

    if (data?.rates) {
        ratesKey = Object.keys(data.rates).map(key => {
            return {label: key, value: key}
        });
    }
    return (
        <section className={styles.container}>
            <header>
                <Input type="date" onChange={dateHandler} />
            </header>
            <div className={styles.source}>
                <header>
                    <Select
                        items={ratesKey}
                        value={baseRate}
                        onchange={(v) => rateHandler(v, 'source')} />
                </header>
                <Input
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
                        items={ratesKey}
                        value={targetBaseRate}
                        onchange={(v) => rateHandler(v, 'target')} />
                </header>
                <Input
                    className={styles.input}
                    name="target"
                    value={exchangeTarget}
                    onChange={exchangeHandler}
                    type="number" />
            </div>
        </section>
    );
};

export default Converter;