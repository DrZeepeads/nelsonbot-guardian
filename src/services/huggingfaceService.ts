import { API_ENDPOINTS } from '@/api/apiConfig';

export const generateResponse = async (message: string): Promise<string> => {
  try {
    console.log("Sending request to Hugging Face API:", message);
    
    const response = await fetch(API_ENDPOINTS.huggingface, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer hf_dummy_key' // This will be replaced with the actual key
      },
      body: JSON.stringify({
        inputs: message
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Hugging Face API response:", data);

    return Array.isArray(data) ? data[0].generated_text : data.generated_text;
  } catch (error) {
    console.error("Hugging Face API error:", error);
    throw error;
  }
};