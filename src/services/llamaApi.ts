import { API_HEADERS } from '@/api/apiConfig';
import { generateResponse as huggingfaceGenerate } from './huggingfaceService';

export const llamaApi = {
  async generateResponse(prompt: string): Promise<string> {
    console.log('Attempting to generate response for:', prompt);

    try {
      console.log('Trying Hugging Face API...');
      const response = await huggingfaceGenerate(prompt);
      if (response) {
        return response;
      }
    } catch (error) {
      console.error('Hugging Face API error:', error);
    }

    // Generate context-aware fallback response
    console.log('Using offline fallback response');
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes('pediatric') || 
        lowerPrompt.includes('child') || 
        lowerPrompt.includes('baby') ||
        lowerPrompt.includes('infant')) {
      return "Based on the Nelson Textbook of Pediatrics, I can provide general guidance on pediatric topics. However, for specific medical advice, please consult with a healthcare provider.";
    }
    
    return "I'm here to help with pediatric-related questions. How can I assist you today?";
  }
};