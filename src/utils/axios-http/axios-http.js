/* eslint-disable */

import axios from 'axios';

//tao ra instance axios cho cac request khong can token
const createAxiosInstance = (baseURL) => {
    return axios.create({
        baseURL,
    });
};


const publicInstance = createAxiosInstance(import.meta.env.VITE_APP_URL_BE);


const request = (instance, config) => {
    return instance({ ...config });
};


export { request, publicInstance };