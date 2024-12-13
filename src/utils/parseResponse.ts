interface ApiResponse {
  status: number;
  data?: any;
  error?: string;
}

export const parseApiResponse = async (response: Response): Promise<ApiResponse> => {
  try {
    const data = await response.json();
    
    if (!response.ok) {
      return {
        status: response.status,
        error: data.error || 'An error occurred'
      };
    }

    return {
      status: response.status,
      data
    };
  } catch (error) {
    console.error('Error parsing API response:', error);
    return {
      status: 500,
      error: 'Failed to parse response'
    };
  }
};

export const sanitizeMessage = (message: string): string => {
  // Basic XSS prevention
  return message
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .trim();
};

export const formatChatResponse = (response: any) => {
  if (!response || typeof response !== 'object') {
    return {
      text: 'Invalid response format',
      error: true
    };
  }

  return {
    text: response.message || response.text || 'No message content',
    error: false
  };
};