export const API_BASE_URL = 'https://api.nelsonbot.com';

export const API_ENDPOINTS = {
  chat: '/api/chat',
  resources: '/api/resources',
  settings: '/api/settings',
  llama: '/api/llama'
} as const;

export const API_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};