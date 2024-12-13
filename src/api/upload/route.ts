import { NextRequest, NextResponse } from 'next/server';

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

    // Here you would typically:
    // 1. Upload the file to a storage service (e.g., AWS S3, Cloudinary)
    // 2. Save the file metadata to your database
    // For now, we'll just return a success message
    
    return NextResponse.json({
      message: 'File uploaded successfully',
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