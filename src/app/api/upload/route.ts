import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  // Get the filename from the search parameters
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');
  console.log(filename)
  if (!filename || !request.body) {
    return NextResponse.json(
      { message: 'Missing filename or file body.' },
      { status: 400 },
    );
  }

  // Upload the file to Vercel Blob storage
  const blob = await put(filename, request.body, {
    access: 'public',
    addRandomSuffix: true, 
  });

  // Return the blob details
  return NextResponse.json(blob);
}