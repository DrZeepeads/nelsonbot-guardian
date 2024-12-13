import { API_HEADERS, FALLBACK_ENDPOINTS } from '@/api/apiConfig';
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

    // Try primary fallback
    try {
      console.log('Trying primary fallback endpoint...');
      const response = await fetch(FALLBACK_ENDPOINTS.primary, {
        method: 'POST',
        headers: API_HEADERS,
        body: JSON.stringify({ 
          prompt,
          max_tokens: 250,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Primary fallback response:', data);
        if (data && data.response) {
          return data.response;
        }
      }
    } catch (error) {
      console.error('Primary fallback error:', error);
    }

    // Generate offline fallback response based on context
    console.log('Using offline fallback response');
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes('pediatric') || 
        lowerPrompt.includes('child') || 
        lowerPrompt.includes('baby') ||
        lowerPrompt.includes('infant')) {
      return "I'm currently operating in offline mode. For pediatric questions, please consult with a healthcare provider. The Nelson Textbook of Pediatrics recommends seeking immediate medical attention for any concerning symptoms in children.";
    }
    
    return "I'm currently in offline mode but I can provide general pediatric information based on the Nelson Textbook of Pediatrics. How can I assist you?";
  }
};