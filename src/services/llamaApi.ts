const MOCK_RESPONSES = {
  fever: "For pediatric fever, it's important to monitor temperature and ensure proper hydration. Contact a healthcare provider if fever persists over 24 hours in young children.",
  vaccination: "Infant vaccination schedules typically begin at birth and continue through adolescence. Key vaccines include DTaP, MMR, and Hepatitis B.",
  default: "I'm your pediatric assistant. I can provide general information based on the Nelson Textbook of Pediatrics. For specific medical advice, please consult a healthcare provider."
};

export const llamaApi = {
  async generateResponse(prompt: string): Promise<string> {
    console.log('Generating response for:', prompt);
    
    // Simple keyword matching for demo purposes
    const promptLower = prompt.toLowerCase();
    if (promptLower.includes('fever')) {
      return MOCK_RESPONSES.fever;
    } else if (promptLower.includes('vaccin')) {
      return MOCK_RESPONSES.vaccination;
    }
    
    return MOCK_RESPONSES.default;
  }
};