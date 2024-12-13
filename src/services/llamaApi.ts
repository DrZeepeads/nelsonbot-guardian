import { API_BASE_URL, API_HEADERS } from '@/api/apiConfig';

export const llamaApi = {
  async generateResponse(prompt: string): Promise<string> {
    try {
      const response = await fetch(`${API_BASE_URL}/llama`, {
        method: 'POST',
        headers: API_HEADERS,
        body: JSON.stringify({ prompt })
      });

      if (!response.ok) {
        throw new Error('Failed to generate response');
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('LlamaAPI Error:', error);
      throw error;
    }
  }
};