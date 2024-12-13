import { FALLBACK_ENDPOINTS, API_HEADERS } from '@/api/apiConfig';

export const llamaApi = {
  async generateResponse(prompt: string): Promise<string> {
    console.log('Attempting to generate response for:', prompt);

    // Try Hugging Face endpoint
    try {
      console.log('Trying Hugging Face endpoint...');
      const response = await fetch(FALLBACK_ENDPOINTS.primary, {
        method: 'POST',
        headers: API_HEADERS,
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 250,
            temperature: 0.7,
            top_p: 0.9,
          }
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Hugging Face response:', data);
        if (data && data.generated_text) {
          return data.generated_text;
        }
      }
    } catch (error) {
      console.error('Hugging Face API error:', error);
    }

    // Try Nelson API endpoint
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

    // If both APIs fail, provide a context-aware fallback response
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