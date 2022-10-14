import AuthStorage from '@/services/auth-storage';
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import AppToast from '@/components/toast/';
import VueApp from '@/main';

export const interceptRequest = (requestConfig: AxiosRequestConfig) => {
    const token = AuthStorage.getToken();
    if (token) {
        requestConfig.headers.Authorization = `bearer ${token}`;
    }
    return requestConfig;
};

export const interceptRequestError = (error: any) => {
    return Promise.reject(error);
};

export const interceptResponse = (response: AxiosResponse) => {
    return response;
};

export const interceptResponseError = (error: any) => {
    const res = error.response;
    if (res.status >= 500) {
        if (!res.config.headers['x-silent-status']?.includes(res.status)) {
            AppToast.error(res.data.message || res.data.error || 'Server Error\nPlease Refresh page and try again', {
                timeout: 10000,
            });
        }
    }
    if (res.status === 401) {
        VueApp.$store.dispatch('auth/logout');
        if (!VueApp.$router.currentRoute.meta?.guest) {
            VueApp.$router?.replace({
                name: 'auth.login',
                query: {next: VueApp.$router.currentRoute.fullPath},
            }).catch(() => Promise.reject(undefined));
        }
    } else if (res.status >= 400 && res.status < 500) {
        if (res.status === 404) {
            AppToast.error(res.data.message || res.data.error_description || res.data.error || `Requested data not found. Given information isn't right.`, {
                timeout: 10000,
            });
        } else if (!res.config.headers['x-silent-status']?.includes(res.status)) {
            AppToast.error(res.data.message || res.data.error_description || res.data.error || 'Unknown Error', {
                timeout: 10000,
            });
        }
    }
    return Promise.reject(error);
};
