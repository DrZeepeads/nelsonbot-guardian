import { Client } from '@gradio/client';
import { API_ENDPOINTS } from '@/api/apiConfig';

export const sendMessage = async (message: string): Promise<string> => {
  try {
    console.log("Connecting to Gradio with URL:", API_ENDPOINTS.huggingface);
    const client = await Client.connect(API_ENDPOINTS.huggingface, {
      hf_token: import.meta.env.HUGGINGFACE_API_KEY
    });
    
    const result = await client.predict(message, api_name="/chat");

    console.log("Raw Gradio response:", result);
    
    if (!result || !result.data) {
      throw new Error("Invalid response from Gradio API");
    }

    const processedResult = Array.isArray(result.data) 
      ? result.data[0] 
      : typeof result.data === 'string' 
        ? result.data 
        : JSON.stringify(result.data);

    return processedResult || "I apologize, but I couldn't process the response. Please try again.";
  } catch (error) {
    console.error("Detailed Gradio error:", error);
    throw error;
  }
};