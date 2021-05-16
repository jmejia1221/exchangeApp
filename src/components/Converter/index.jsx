import React, {useState} from "react";

// Service
import ratesApi from '../../services/converter_service';

// Libs
import _ from 'lodash';

// Components
import Input from "../UI/Input";

// CSS
import styles from './converter.module.scss';

const Converter = ({ data }) => {
    console.log(data)
    const [exchangeSource, setExchangeSource] = useState(0);
    const [exchangeTarget, setExchangeTarget] = useState(0);

    const [baseRate, setBaseRate] = useState('EUR');
    const [targetBaseRate, setTargetBaseRate] = useState('USD');

    let temp1, temp2 = null;

    const baseApi = async (value, base, symbol, sourceType) => {
        const data = await ratesApi.get(`/latest?base=${base}&symbols=${symbol}`);
        const computeRate = value * data.data.rates[symbol];
        if (sourceType === 'target') setExchangeSource(computeRate)
        if (sourceType === 'source') setExchangeTarget(computeRate)
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

        baseApi(value, base, symbol, name);
    }

    const rateHandler = (type, rate) => {
        console.log(rate)
        if (type === 'source') setBaseRate(rate);
        if (type === 'target') setTargetBaseRate(rate);
    }

    if (data?.rates) {
        temp1 = Object.keys(data.rates).map(rate => {
            return <button onClick={() => rateHandler('source', rate)} key={_.uniqueId()}>{rate}</button>
        });
        temp2 = Object.keys(data.rates).map(rate => {
            return <button onClick={() => rateHandler('target', rate)} key={_.uniqueId()}>{rate}</button>
        });
    }
    return (
        <section className={styles.container}>
            <div>
                <header>
                    {temp1}
                </header>
                <Input name="source" value={exchangeSource} onChange={exchangeHandler} type="number" />
            </div>
            <div>
                <button>Swap</button>
            </div>
            <div>
                <header>
                    {temp2}
                </header>
                <Input name="target" value={exchangeTarget} onChange={exchangeHandler} type="number" />
            </div>
        </section>
    );
};

export default Converter;