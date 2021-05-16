import React, {useEffect, useState} from "react";

// Service
import ratesApi from '../../services/converter_service';

// Components
import Converter from "../../components/Converter";

// CSS
import styles from './Home.module.scss';

const Home = () => {
    const [ratesData, setRatesData] = useState();

    useEffect(() => {
        const getRates = async () => {
            const response = await ratesApi.get('/latest');
            setRatesData(response.data);
        };

        getRates();
    }, []);

    return (
        <div className={styles.container}>
            <header>
                <h1 className={styles.title}>Exchange money</h1>
            </header>
            <Converter data={ratesData} />
        </div>
    );
};

export default  Home;