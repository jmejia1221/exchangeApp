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

    let rateListItems = null;
    let selectOptions = [];
    let dataChart = [];

    if (ratesData?.rates) {
        const entriesFromRates = Object.entries(ratesData.rates);

        dataChart = entriesFromRates.map(([key, value]) => {
            return {
                name: key,
                exchange: value
            };
        });
        selectOptions = entriesFromRates.map(([key, _]) => {
            return {'label': key, 'value': key};
        });
        rateListItems = entriesFromRates.map(([key, value]) => {
            return (
                <li key={_.uniqueId()}>
                    <span>{key}</span> <span>{value}</span>
                </li>
            );
        });
    }

    const baseApi = async (value) => {
        try {
            const data = await ratesApi.get(`/${dateSelected}`, {
                params: {
                    base: value
                }
            });
            setRatesData(data.data);
        } catch (err) {
            console.error(err);
        }
    }

    const selectBaseHandler = (value) => {
        setSelectValue(value);
        baseApi(value);
    }

    const changeDateHandler = (e) => {
        setDateSelected(e.target.value)
    }

    return (
        <section className={styles.container}>
            <header className={styles.header}>
                <h3 className={styles.title}>
                    {dateSelected === 'latest' ? 'Today\'s' : dateSelected} exchange / Base: {ratesData?.base}
                </h3>
                <div className={styles.actions}>
                    <Select
                        placeholder="Select a base"
                        items={selectOptions}
                        value={selectValue}
                        onchange={selectBaseHandler} />
                    <Input
                        label="Change date conversion"
                        type="date"
                        onChange={changeDateHandler} />
                </div>
            </header>
            <section className={styles.body}>
                <ul className={styles.rateList}>
                    <li>
                        <strong>Rate</strong> <strong>Amount</strong>
                    </li>
                    <ul className={styles.sublist}>
                        {rateListItems}
                    </ul>
                </ul>
                <div className={styles.graphContainer}>
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
                </div>
            </section>
        </section>
    );
};

export default LiveExchange;