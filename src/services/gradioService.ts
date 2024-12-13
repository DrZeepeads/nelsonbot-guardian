import { Client } from '@gradio/client';

const GRADIO_URL = import.meta.env.VITE_GRADIO_URL;

if (!GRADIO_URL) {
  console.error('GRADIO_URL is not defined in environment variables');
}

export const sendMessage = async (message: string): Promise<string> => {
  try {
    console.log("Connecting to Gradio with URL:", GRADIO_URL);
    const client = new Client(GRADIO_URL);
    
    const result = await client.predict("/predict", [
      message, // Input message
    ]);

    if (!result) {
      throw new Error('No response from Gradio API');
    }

    console.log("Raw Gradio response:", result);
    
    // Handle the response based on its structure
    const processedResult = Array.isArray(result.data) 
      ? result.data[0] 
      : typeof result.data === 'string' 
        ? result.data 
        : JSON.stringify(result.data);

    return processedResult;
  } catch (error) {
    console.error("Detailed Gradio error:", error);
    throw new Error('Failed to get response from Gradio API: ' + (error as Error).message);
  }
};