import axios from "axios";

const ratesApi = axios.create({
    baseURL: 'https://api.ratesapi.io/api'
});

export default  ratesApi;