import { API_ENDPOINTS } from '@/api/apiConfig';

export const generateResponse = async (message: string): Promise<string> => {
  try {
    console.log("Sending request to Hugging Face API:", message);
    
    const response = await fetch(API_ENDPOINTS.huggingface, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer hf_dummy_key' // Replace with actual key in production
      },
      body: JSON.stringify({
        inputs: message,
        parameters: {
          max_length: 100,
          temperature: 0.7,
          top_p: 0.9,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Hugging Face API response:", data);

    if (Array.isArray(data) && data[0]?.generated_text) {
      return data[0].generated_text;
    } else if (data?.generated_text) {
      return data.generated_text;
    }

    throw new Error('Invalid response format from Hugging Face API');
  } catch (error) {
    console.error("Hugging Face API error:", error);
    throw error;
  }
};