import { API_ENDPOINTS, API_HEADERS } from '@/api/apiConfig';

export const pdfService = {
  async analyzePdfContent(content: string) {
    try {
      const response = await fetch(API_ENDPOINTS.pdf, {
        method: 'POST',
        headers: API_HEADERS,
        body: JSON.stringify({ content })
      });

      if (!response.ok) {
        throw new Error('Failed to analyze PDF content');
      }

      return await response.json();
    } catch (error) {
      console.error('PDF analysis error:', error);
      throw error;
    }
  },

  async searchPdfContent(query: string, content: string) {
    try {
      const response = await fetch(API_ENDPOINTS.chat, {
        method: 'POST',
        headers: API_HEADERS,
        body: JSON.stringify({ query, content })
      });

      if (!response.ok) {
        throw new Error('Failed to search PDF content');
      }

      return await response.json();
    } catch (error) {
      console.error('PDF search error:', error);
      throw error;
    }
  }
};