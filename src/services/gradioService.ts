import { Client } from '@gradio/client';

const GRADIO_URL = import.meta.env.VITE_GRADIO_URL || "https://huggingface.co/spaces/Drzee1994/meta-llama-Llama-3.2-1B";

export const sendMessage = async (message: string): Promise<string> => {
  try {
    const client = new Client(GRADIO_URL);
    console.log("Connecting to Gradio with URL:", GRADIO_URL);
    
    const result = await client.predict(message, {
      apiName: "/predict"
    });
    
    console.log("Gradio response:", result);
    return result.toString();
  } catch (error) {
    console.error("Detailed Gradio error:", error);
    throw new Error("Failed to get response from AI model. Please try again later.");
  }
};