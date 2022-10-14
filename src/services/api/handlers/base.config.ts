import AuthStorage from '../../auth-storage';

export default {
    baseURL: process.env.VUE_APP_API_ENDPOINT,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + AuthStorage.getToken(),
    },
};

