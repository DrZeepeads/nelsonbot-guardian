import { API_HEADERS, FALLBACK_ENDPOINTS } from '@/api/apiConfig';

const MOCK_RESPONSES = {
  default: "I'm here to help with pediatric questions. What would you like to know?",
  error: "I apologize, but I'm having trouble connecting right now. Please try asking your question again.",
  pediatric: "Based on pediatric guidelines, it's recommended to consult with your healthcare provider for specific medical advice.",
  connection: "I'm currently experiencing connection issues, but I can still assist you with general pediatric information."
};

export const llamaApi = {
  async generateResponse(prompt: string): Promise<string> {
    console.log('Attempting to generate response for:', prompt);

    // Try primary endpoint (Hugging Face)
    try {
      console.log('Trying primary endpoint...');
      const primaryResponse = await fetch(FALLBACK_ENDPOINTS.primary, {
        method: 'POST',
        headers: API_HEADERS,
        body: JSON.stringify({ inputs: prompt }),
      });

      if (primaryResponse.ok) {
        const data = await primaryResponse.json();
        console.log('Primary endpoint response:', data);
        return data.generated_text || MOCK_RESPONSES.default;
      }
      console.log('Primary endpoint failed, trying secondary...');
    } catch (error) {
      console.log('Primary endpoint error:', error);
    }

    // Try secondary endpoint (NelsonBot API)
    try {
      console.log('Trying secondary endpoint...');
      const secondaryResponse = await fetch(FALLBACK_ENDPOINTS.secondary, {
        method: 'POST',
        headers: API_HEADERS,
        body: JSON.stringify({ prompt }),
      });

      if (secondaryResponse.ok) {
        const data = await secondaryResponse.json();
        console.log('Secondary endpoint response:', data);
        return data.response || MOCK_RESPONSES.default;
      }
      console.log('Secondary endpoint failed, using fallback...');
    } catch (error) {
      console.log('Secondary endpoint error:', error);
    }

    // Fallback response based on prompt content
    console.log('Using fallback response');
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes('pediatric') || lowerPrompt.includes('child') || lowerPrompt.includes('baby')) {
      return MOCK_RESPONSES.pediatric;
    }
    
    return MOCK_RESPONSES.default;
  }
};