import { Client } from '@gradio/client';

const GRADIO_URL = import.meta.env.VITE_GRADIO_URL || "https://huggingface.co/spaces/Drzee1994/meta-llama-Llama-3.2-1B";

export const sendMessage = async (message: string): Promise<string> => {
  try {
    const client = new Client(GRADIO_URL);
    console.log("Connecting to Gradio with URL:", GRADIO_URL);
    
    const result: unknown = await client.predict(message, {
      apiName: "/predict"
    });
    
    // Robust type checking and fallback
    const processedResult = result !== null && result !== undefined 
      ? String(result).trim() 
      : "I'm sorry, but I couldn't generate a response. Please try again.";
    
    console.log("Gradio response:", processedResult);
    return processedResult;
  } catch (error) {
    console.error("Detailed Gradio error:", error);
    return "I encountered an error processing your request. Please try again later.";
  }
};