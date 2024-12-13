import { API_BASE_URL, API_HEADERS, API_ENDPOINTS } from '@/api/apiConfig';

const MOCK_RESPONSES = {
  default: "I'm here to help with pediatric questions. What would you like to know?",
  error: "I apologize, but I'm having trouble connecting right now. Please try asking your question again.",
  pediatric: "Based on pediatric guidelines, it's recommended to consult with your healthcare provider for specific medical advice."
};

export const llamaApi = {
  async generateResponse(prompt: string): Promise<string> {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.llama}`, {
        method: 'POST',
        headers: API_HEADERS,
        body: JSON.stringify({ prompt })
      });

      if (!response.ok) {
        console.log('LlamaAPI response not ok, using fallback');
        return this.getFallbackResponse(prompt);
      }

      const data = await response.json();
      return data.response || this.getFallbackResponse(prompt);
    } catch (error) {
      console.error('LlamaAPI Error:', error);
      return this.getFallbackResponse(prompt);
    }
  },

  getFallbackResponse(prompt: string): string {
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes('pediatric') || lowerPrompt.includes('child') || lowerPrompt.includes('baby')) {
      return MOCK_RESPONSES.pediatric;
    }
    
    return MOCK_RESPONSES.default;
  }
};