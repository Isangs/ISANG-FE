import axios from 'axios';

export const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error(
      '[API]',
      err.config?.method?.toUpperCase(),
      err.config?.url,
      err.response?.status,
      err.response?.data,
    );
    return Promise.reject(err);
  },
);

export default api;
