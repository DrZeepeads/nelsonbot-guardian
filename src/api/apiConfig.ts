export const API_BASE_URL = process.env.VITE_API_BASE_URL || 'https://api.example.com';

export const API_ENDPOINTS = {
  chat: `${API_BASE_URL}/chat`,
  pdf: `${API_BASE_URL}/pdf`,
  status: `${API_BASE_URL}/status`,
};

export const API_HEADERS = {
  'Content-Type': 'application/json',
};

export const UPLOAD_ENDPOINTS = {
  pdf: `${API_BASE_URL}/upload/pdf`,
  txt: `${API_BASE_URL}/upload/txt`,
};