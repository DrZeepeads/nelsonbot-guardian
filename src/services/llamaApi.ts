import { sendMessage as gradioSendMessage } from './gradioService';

export const llamaApi = {
  async generateResponse(prompt: string): Promise<string> {
    try {
      console.log('Attempting to generate response for:', prompt);
      const response = await gradioSendMessage(prompt);
      return response;
    } catch (error) {
      console.error('LlamaAPI Error:', error);
      return "I apologize, but I'm having trouble connecting to the server. For pediatric questions, please try again in a moment or consult with a healthcare provider for immediate concerns.";
    }
  }
};