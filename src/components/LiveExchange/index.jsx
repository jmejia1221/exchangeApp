import React, {useEffect, useState} from "react";

// Libs
import _ from 'lodash';
import {CartesianGrid, Area, AreaChart, Tooltip, XAxis, YAxis} from "recharts";

// Components
import Select from "../UI/Select";

// Services
import ratesApi from "../../services/converter_service";
import Input from "../UI/Input";

// CSS
import styles from './LiveExchange.module.scss';

const LiveExchange = () => {
    const [ratesData, setRatesData] = useState({});
    const [selectValue, setSelectValue] = useState('USD')
    const [dateSelected, setDateSelected] = useState('latest')

    useEffect(() => {
        const defaultBase = 'USD';

        baseApi(selectValue);
        setSelectValue(defaultBase);
    }, [dateSelected])

    let items = null;
    let options = [];
    let dataChart = [];

    if (ratesData?.rates) {
        dataChart = Object.entries(ratesData.rates).map(([key, value]) => {
            return {
                name: key,
                exchange: value
            }
        });
        options = Object.entries({...ratesData?.rates}).map(([key, _]) => {
            return {'label': key, 'value': key}
        });
        items = Object.entries(ratesData?.rates).map(([key, value]) => {
            return (
                <li key={_.uniqueId()}>
                    <span>{key}</span> <span>{value}</span>
                </li>
            );
        });
    }

    const baseApi = async (value) => {
        const data = await ratesApi.get(`/${dateSelected}?base=${value}`);
        setRatesData(data.data);
    }

    const selectBaseHandler = (value) => {
        setSelectValue(value)
        baseApi(value);
    }

    const changeDateHanlder = (e) => {
        setDateSelected(e.target.value)
    }

    return (
        <section className={styles.container}>
            <h3 className={styles.title}>
                {dateSelected === 'latest' ? 'Today\'s' : dateSelected} exchange - Base: {ratesData?.base}
            </h3>
            <div className={styles.actions}>
                <Select items={options} value={selectValue} onchange={selectBaseHandler} />
                <Input type="date" onChange={changeDateHanlder} />
            </div>
            <ul className={styles.rateList}>
                <li><strong>Rate</strong> <strong>Amount</strong></li>
                {items}
            </ul>
            <div className={styles.graph}>
                <AreaChart
                    width={1700}
                    height={400}
                    data={dataChart}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="exchange" stroke="var(--primary)" fill="var(--primary)" />
                </AreaChart>
            </div>
        </section>
    );
};

export default LiveExchange;