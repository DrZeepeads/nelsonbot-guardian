export const API_BASE_URL = 'https://api.nelsonbot.com';

export const API_ENDPOINTS = {
  chat: '/api/chat',
  resources: '/api/resources',
  settings: '/api/settings',
  huggingface: 'https://api-inference.huggingface.co/models/meta-llama/Llama-3.2-1B'
} as const;

export const API_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': `Bearer ${import.meta.env.VITE_HUGGINGFACE_API_KEY}`
};

export const FALLBACK_ENDPOINTS = {
  primary: 'https://api.nelsonbot.com/chat',
  secondary: 'https://api.nelsonbot.com/llama'
} as const;