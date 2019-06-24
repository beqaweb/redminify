import axiosModule from 'axios';
import base64 from 'react-native-base64';

const axios = axiosModule.create({
    baseURL: 'https://redmine.ekreative.com'
});

export const setRedmineApiKey = (key) => {
    if (key) {
        axios.defaults.headers['X-Redmine-API-Key'] = key;
    }
};

const redmineApi = {};

redmineApi.getCurrentUser = ([username, password]) => {
    const path = '/users/current.json';
    if (username && password) {
        return axios.get(path, {
            headers: {
                Authorization: `Basic ${base64.encode(`${username}:${password}`)}`
            }
        });
    }
    return axios.get(path);
};

redmineApi.indexProjects = (params = {}) => {
    let paramsStr = '?';
    Object.entries(params)
        .forEach(([key, value]) => {
            if (key && value) {
                if (paramsStr !== '?') {
                    paramsStr += '&';
                }
                paramsStr += `${key}=${value}`;
            }
        });
    return axios.get(`/projects.json${paramsStr}`);
};

redmineApi.getProject = (id, params = {}) => {
    let paramsStr = '?';
    Object.entries(params)
        .forEach(([key, value]) => {
            if (key && value) {
                if (paramsStr !== '?') {
                    paramsStr += '&';
                }
                paramsStr += `${key}=${value}`;
            }
        });
    return axios.get(`/projects/${id}.json${paramsStr}`);
};

export default redmineApi;
