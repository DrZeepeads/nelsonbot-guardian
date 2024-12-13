export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
  chat: '/api/chat',
  resources: '/api/resources',
  settings: '/api/settings'
} as const;

export const API_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};