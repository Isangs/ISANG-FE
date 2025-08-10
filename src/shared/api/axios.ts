import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
  withCredentials: true,
});

api.interceptors.request.use((config) => config);

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error(
      '[API]',
      err.config?.method?.toUpperCase?.(),
      err.config?.url,
      err.response?.status,
      err.response?.data,
    );
    return Promise.reject(err);
  },
);

export default api;
export { api };
