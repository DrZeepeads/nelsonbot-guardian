import { NextRequest, NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/services/cloudinaryService';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = ['application/pdf', 'text/plain'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only PDF and TXT files are allowed.' },
        { status: 400 }
      );
    }

    // Upload to Cloudinary
    const cloudinaryUrl = await uploadToCloudinary(file);
    
    return NextResponse.json({
      message: 'File uploaded successfully',
      url: cloudinaryUrl,
      fileName: file.name,
      fileType: file.type
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}