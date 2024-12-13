import { Client } from '@gradio/client';

const GRADIO_URL = import.meta.env.VITE_GRADIO_URL || "https://huggingface.co/spaces/Drzee1994/meta-llama-Llama-3.2-1B";

export const sendMessage = async (message: string): Promise<string> => {
  try {
    console.log("Connecting to Gradio with URL:", GRADIO_URL);
    const client = new Client(GRADIO_URL);
    
    const result = await client.predict("/predict", [
      message,
    ]);

    console.log("Raw Gradio response:", result);
    
    // Handle different response formats
    if (!result || !result.data) {
      return "I apologize, but I couldn't generate a response. Please try again.";
    }

    // Process the response based on its structure
    const processedResult = Array.isArray(result.data) 
      ? result.data[0] 
      : typeof result.data === 'string' 
        ? result.data 
        : JSON.stringify(result.data);

    return processedResult || "I apologize, but I couldn't process the response. Please try again.";
  } catch (error) {
    console.error("Gradio API error:", error);
    return "I encountered an error processing your request. Please try again later.";
  }
};