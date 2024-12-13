export const API_BASE_URL = 'https://api.nelsonbot.com';

export const API_ENDPOINTS = {
  chat: '/api/chat',
  resources: '/api/resources',
  settings: '/api/settings',
  huggingface: import.meta.env.VITE_GRADIO_URL || 'https://huggingface.co/spaces/Drzee1994/meta-llama-Llama-3.2-1B'
} as const;

export const API_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': `Bearer ${import.meta.env.HUGGINGFACE_API_KEY}`
};

// Remove localhost references
export const FALLBACK_ENDPOINTS = {
  primary: `${API_BASE_URL}/chat`,
  secondary: `${API_BASE_URL}/llama`
} as const;