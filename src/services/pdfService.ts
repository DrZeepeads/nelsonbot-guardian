import { API_ENDPOINTS, API_HEADERS } from '@/api/apiConfig';

export const pdfService = {
  async checkStatus() {
    try {
      const response = await fetch(API_ENDPOINTS.status, {
        method: 'GET',
        headers: API_HEADERS
      });

      if (!response.ok) {
        throw new Error('Failed to check PDF service status');
      }

      return await response.json();
    } catch (error) {
      console.error('PDF status check error:', error);
      throw error;
    }
  },

  async uploadFile(file: File) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(API_ENDPOINTS.pdf + '/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      return await response.json();
    } catch (error) {
      console.error('File upload error:', error);
      throw error;
    }
  },

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