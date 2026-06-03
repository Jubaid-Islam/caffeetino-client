import { useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_URL,
    withCredentials: true,
});

const useAxiosSecure = () => {
    const { logOut } = useContext(AuthContext);

    useEffect(() => {
        const requestInterceptor = axiosInstance.interceptors.request.use(config => {
            return config;
        });

        const responseInterceptor = axiosInstance.interceptors.response.use(
            res => res,
            err => {
                if (err.response?.status === 401 || err.response?.status === 403) {
                    logOut().then(() => {
                        console.log(`Logged out for ${err.response.status}`);
                    });
                }
                return Promise.reject(err);
            }
        );

        return () => {
            axiosInstance.interceptors.request.eject(requestInterceptor);
            axiosInstance.interceptors.response.eject(responseInterceptor);
        };
    }, [logOut]);

    return axiosInstance;
};

export default useAxiosSecure;



















