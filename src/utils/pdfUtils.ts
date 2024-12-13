import * as pdfParse from 'pdf-parse';

export const parsePDFContent = async (file: File): Promise<string> => {
  try {
    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    // Convert ArrayBuffer to Buffer (required by pdf-parse)
    const buffer = Buffer.from(arrayBuffer);
    
    const data = await pdfParse(buffer);
    return data.text;
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw new Error('Failed to parse PDF file');
  }
};