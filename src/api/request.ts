import axios from 'axios';

const request = axios.create({
    //baseURL: 'https://83.252.236.74/',
    baseURL: 'http://127.0.0.1:8000/',
    timeout: 0,
    xsrfHeaderName: 'x-csrftoken',
    xsrfCookieName: 'csrftoken',
    withCredentials: true,
});

export default request;