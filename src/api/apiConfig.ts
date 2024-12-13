export const API_ENDPOINTS = {
  huggingface: import.meta.env.VITE_GRADIO_URL || 'https://huggingface.co/spaces/Drzee1994/meta-llama-Llama-3.2-1B'
} as const;

export const API_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': `Bearer ${import.meta.env.HUGGINGFACE_API_KEY}`
};

export const ENDPOINTS = {
  primary: API_ENDPOINTS.huggingface,
  chat: `${API_ENDPOINTS.huggingface}/chat`
} as const;