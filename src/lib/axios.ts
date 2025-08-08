"use server"

import axios from 'axios';

export const instance = axios.create({
  baseURL: process.env.SERVER_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});
