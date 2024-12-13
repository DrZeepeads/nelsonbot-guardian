import { API_HEADERS } from '@/api/apiConfig';
import { sendMessage as gradioSendMessage } from './gradioService';

export const llamaApi = {
  async generateResponse(prompt: string): Promise<string> {
    console.log('Attempting to generate response for:', prompt);

    try {
      // Try Gradio first
      console.log('Trying Gradio API...');
      const response = await gradioSendMessage(prompt);
      console.log('Gradio response:', response);
      if (response) {
        return response;
      }
    } catch (error) {
      console.error('Gradio API error:', error);
      // Fall through to fallback response
    }

    // If Gradio fails, return a context-aware fallback response
    console.log('Using offline fallback response');
    return "I apologize, but I'm having trouble connecting to the server. For pediatric questions, please try again in a moment or consult with a healthcare provider for immediate concerns.";
  }
};