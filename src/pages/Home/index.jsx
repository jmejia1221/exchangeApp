import React, {useEffect, useState} from "react";

// Libs
import _ from 'lodash';

// Service
import ratesApi from '../../services/converter_service';

// Components
import Converter from "../../components/Converter";
import LiveExchange from "../../components/LiveExchange";
import Button from "../../components/UI/Button";

// CSS
import styles from './Home.module.scss';

const Home = () => {
    const [ratesData, setRatesData] = useState();
    const [newConverter, setNewConverter] = useState([]);

    useEffect(() => {
        const getRates = async () => {
            const response = await ratesApi.get('/latest');
            setRatesData(response.data);
        };

        getRates();
    }, []);

    const addNewConverterHandler = (component) => {
        setNewConverter([...newConverter, component]);
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Exchange money</h1>
                <div className={styles.button}>
                    <Button onClick={() => addNewConverterHandler(Converter)}>Add converter</Button>
                </div>
            </header>
            <Converter data={ratesData} />
            {newConverter.map(converter => {
                return <Converter key={_.uniqueId()} data={ratesData} />
            })}
            <LiveExchange />
        </div>
    );
};

export default  Home;