import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function getAuthenticatedDrive() {
  const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
  );

  if (process.env.GOOGLE_REFRESH_TOKEN) {
    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });
  }

  return google.drive({ version: 'v3', auth: oauth2Client });
}

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ fileId: string }> }
) {
  try {
    const params = await context.params;
    const { fileId } = params;
    const { searchParams } = new URL(request.url);
    const size = searchParams.get('size') || 'medium';

    const drive = getAuthenticatedDrive();

    // Get the file metadata first
    const fileResponse = await drive.files.get({
      fileId: fileId,
      fields: 'id,name,mimeType,webViewLink,thumbnailLink',
    });

    const file = fileResponse.data;

    if (!file.mimeType?.startsWith('image/')) {
      return NextResponse.json(
          { error: 'File is not an image' },
          { status: 400 }
      );
    }

    // For thumbnail size, try to use Google's thumbnail first, then fallback to full image
    if (size === 'thumbnail' && file.thumbnailLink) {
      try {
        // Fetch the thumbnail directly from Google's thumbnail service
        const thumbnailResponse = await fetch(file.thumbnailLink);
        if (thumbnailResponse.ok) {
          const buffer = await thumbnailResponse.arrayBuffer();
          return new NextResponse(buffer, {
            headers: {
              'Content-Type': file.mimeType,
              'Cache-Control': 'public, max-age=86400',
              'Content-Length': buffer.byteLength.toString(),
            },
          });
        }
      } catch (thumbnailError) {
        console.log('Thumbnail fetch failed, falling back to full image:', thumbnailError);
      }
    }

    // Fallback: get the full image data
    const imageResponse = await drive.files.get({
      fileId: fileId,
      alt: 'media',
    }, {
      responseType: 'stream'
    });

    // Convert the stream to a buffer
    const chunks: Uint8Array[] = [];
    const stream = imageResponse.data as NodeJS.ReadableStream;

    for await (const chunk of stream) {
      if (typeof chunk === 'string') {
        chunks.push(new TextEncoder().encode(chunk));
      } else {
        chunks.push(new Uint8Array(chunk));
      }
    }

    const buffer = Buffer.concat(chunks);

    // Return the image with proper headers
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': file.mimeType,
        'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
        'Content-Length': buffer.length.toString(),
      },
    });

  } catch (error) {
    console.error('Image fetch error:', error);
    return NextResponse.json(
        { error: 'Failed to fetch image' },
        { status: 500 }
    );
  }
}