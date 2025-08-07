import axios from 'axios';

// TODO 로그인한거 토큰 알아서 잘 가져와바
export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
