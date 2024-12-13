import { FALLBACK_ENDPOINTS, API_HEADERS } from '@/api/apiConfig';
import { generateResponse as huggingfaceGenerate } from './huggingfaceService';

export const llamaApi = {
  async generateResponse(prompt: string): Promise<string> {
    console.log('Attempting to generate response for:', prompt);

    // Try Hugging Face API first
    try {
      console.log('Trying Hugging Face API...');
      const response = await huggingfaceGenerate(prompt);
      if (response) {
        return response;
      }
    } catch (error) {
      console.error('Hugging Face API error:', error);
    }

    // Try Nelson API as fallback
    try {
      console.log('Trying Nelson API endpoint...');
      const response = await fetch(FALLBACK_ENDPOINTS.secondary, {
        method: 'POST',
        headers: API_HEADERS,
        body: JSON.stringify({ 
          prompt,
          max_tokens: 250,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Nelson API response:', data);
        if (data && data.response) {
          return data.response;
        }
      }
    } catch (error) {
      console.error('Nelson API error:', error);
    }

    // Context-aware fallback response
    console.log('Both APIs failed, using fallback response');
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes('pediatric') || 
        lowerPrompt.includes('child') || 
        lowerPrompt.includes('baby') ||
        lowerPrompt.includes('infant')) {
      return "Based on pediatric guidelines, I can provide general information about children's health. However, for specific medical advice, please consult with your healthcare provider.";
    }
    
    return "I'm here to help with pediatric questions. What would you like to know?";
  }
};