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
    const [converterList, setConverterList] = useState([]);

    useEffect(() => {
        const getRates = async () => {
            try {
                const response = await ratesApi.get('/latest');
                setRatesData(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        getRates();
    }, [ratesData]);

    const addNewConverterHandler = (component) => {
        setConverterList([...converterList, component]);
    }

    const removeConverterHandler = (id) => {
        const converterListCopy = [...converterList];
        const newConverterList = converterListCopy.filter(converter => {
            return converter.id !== id
        });
        setConverterList(newConverterList)
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Exchange money</h1>
                <div className={styles.button}>
                    <Button onClick={() => addNewConverterHandler({
                        id: _.uniqueId(),
                        key: _.uniqueId('cvt')
                    })}>
                        Add converter
                    </Button>
                </div>
            </header>
            <Converter data={ratesData} />
            {converterList.map(cvt => {
                return (
                    <Converter
                        id={cvt.id}
                        removeHandler={removeConverterHandler}
                        key={cvt.key}
                        isRemovable={true}
                        data={ratesData} />
                );
            })}
            <LiveExchange />
        </div>
    );
};

export default  Home;