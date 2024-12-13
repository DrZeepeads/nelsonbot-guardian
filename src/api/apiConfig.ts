export const API_ENDPOINTS = {
  baseUrl: '/api',
  chat: '/api/chat',
  pdf: '/api/pdf'
} as const;

export const API_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
} as const;