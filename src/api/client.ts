import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://rosa-cvetov-camelot770.amvera.io';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Telegram init data to every request
api.interceptors.request.use((config) => {
  const tg = (window as any).Telegram?.WebApp;
  if (tg?.initData) {
    config.headers['X-Telegram-Init-Data'] = tg.initData;
  }
  return config;
});

export default api;
