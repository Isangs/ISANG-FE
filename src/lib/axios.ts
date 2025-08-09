'use server';

import axios from 'axios';

export const serverInstance = axios.create({
  baseURL: process.env.API_URL,
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
