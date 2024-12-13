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

export const FALLBACK_ENDPOINTS = {
  primary: 'https://huggingface.co/spaces/Drzee1994/meta-llama-Llama-3.2-1B/predict',
  secondary: 'https://api.nelsonbot.com/llama'
};