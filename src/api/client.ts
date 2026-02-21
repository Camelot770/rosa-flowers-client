import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://rosa-cvetov-camelot770.amvera.io';

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add messenger init data to every request (Telegram or Max)
api.interceptors.request.use((config) => {
  // Telegram WebApp
  const tg = (window as any).Telegram?.WebApp;
  if (tg?.initData) {
    config.headers['X-Telegram-Init-Data'] = tg.initData;
    return config;
  }

  // Max WebApp
  const max = (window as any).WebApp;
  if (max?.initData) {
    config.headers['X-Max-Init-Data'] = max.initData;
    return config;
  }

  return config;
});

export default api;
