import { API_ENDPOINTS, API_HEADERS } from '@/api/apiConfig';

export const generateResponse = async (message: string): Promise<string> => {
  try {
    // For now, return a mock response since we're not connecting to Hugging Face
    return `I understand you're asking about: "${message}". As a pediatric assistant, I aim to provide helpful information based on the Nelson Textbook of Pediatrics. However, please note that this is a demo response and you should always consult with a healthcare professional for medical advice.`;
  } catch (error) {
    console.error("Error generating response:", error);
    throw error;
  }
};