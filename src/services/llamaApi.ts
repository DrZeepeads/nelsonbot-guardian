import { API_BASE_URL, API_HEADERS, API_ENDPOINTS } from '@/api/apiConfig';

const MOCK_RESPONSES = {
  default: "I'm here to help with pediatric questions. What would you like to know?",
  error: "I apologize, but I'm having trouble connecting right now. Please try asking your question again.",
  pediatric: "Based on pediatric guidelines, it's recommended to consult with your healthcare provider for specific medical advice.",
  connection: "I'm currently experiencing connection issues, but I can still assist you with general pediatric information."
};

export const llamaApi = {
  async generateResponse(prompt: string): Promise<string> {
    try {
      // First try the Gradio API
      const gradioResponse = await fetch('https://huggingface.co/spaces/Drzee1994/meta-llama-Llama-3.2-1B/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (gradioResponse.ok) {
        const data = await gradioResponse.json();
        return data.response || this.getFallbackResponse(prompt);
      }

      // If Gradio fails, try the backup API
      const backupResponse = await fetch('https://api.nelsonbot.com/llama', {
        method: 'POST',
        headers: API_HEADERS,
        body: JSON.stringify({ prompt })
      });

      if (backupResponse.ok) {
        const data = await backupResponse.json();
        return data.response || this.getFallbackResponse(prompt);
      }

      console.log('Both APIs failed, using fallback response');
      return this.getFallbackResponse(prompt);
    } catch (error) {
      console.error('API Error:', error);
      return MOCK_RESPONSES.connection;
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