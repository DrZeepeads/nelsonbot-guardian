import { API_BASE_URL, API_HEADERS, API_ENDPOINTS } from '@/api/apiConfig';

const MOCK_RESPONSES = {
  default: "I apologize, but I'm currently experiencing connection issues. Please try again later or contact support if the issue persists.",
  pediatric: "Based on pediatric guidelines, it's recommended to consult with your healthcare provider for personalized medical advice."
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
        // Return a mock response based on the query type
        return prompt.toLowerCase().includes('pediatric') 
          ? MOCK_RESPONSES.pediatric 
          : MOCK_RESPONSES.default;
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('LlamaAPI Error:', error);
      return MOCK_RESPONSES.default;
    }
  }
};