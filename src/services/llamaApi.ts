import { pdfService } from '@/services/pdfService';

export const llamaApi = {
  async generateResponse(message: string, pdfContent?: string) {
    try {
      // If PDF content is provided, use it for context-aware responses
      if (pdfContent) {
        const searchResult = await pdfService.searchPdfContent(message, pdfContent);
        return searchResult.response || "I couldn't find relevant information in the PDF.";
      }

      // Default response generation
      return "I'm here to help with pediatric questions. You can also upload a PDF for more specific information.";
    } catch (error) {
      console.error('Error generating response:', error);
      throw error;
    }
  }
};