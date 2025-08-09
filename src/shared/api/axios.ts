import axios from 'axios';

export const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

// 요청 인터셉터에서 토큰 자동 추가
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken'); // 저장 위치에 맞게 수정
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
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
