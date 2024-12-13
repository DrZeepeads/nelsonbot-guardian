import { Client } from '@gradio/client';

export const gradioClient = new Client('Drzee1994/meta-llama-Llama-3.2-1B');

export const sendMessage = async (message: string): Promise<string> => {
  try {
    const result = await gradioClient.predict(message, { apiName: '/predict' });
    return result.toString();
  } catch (error) {
    console.error('Error calling Gradio API:', error);
    throw new Error('Failed to get response from AI model');
  }
};