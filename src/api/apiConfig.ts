export const API_BASE_URL = process.env.VITE_API_BASE_URL || 'https://your-render-app-name.onrender.com/api';

export const API_ENDPOINTS = {
  chat: `${API_BASE_URL}/chat`,
  pdf: `${API_BASE_URL}/pdf`,
  status: `${API_BASE_URL}/status`,
};

export const API_HEADERS = {
  'Content-Type': 'application/json',
};

export const UPLOAD_ENDPOINTS = {
  pdf: `${API_BASE_URL}/upload`,
  txt: `${API_BASE_URL}/upload`,
  cloudinary: '/api/upload/cloudinary',
};

export const CLOUDINARY_CONFIG = {
  cloudName: process.env.VITE_CLOUDINARY_CLOUD_NAME,
  uploadPreset: process.env.VITE_CLOUDINARY_UPLOAD_PRESET,
};