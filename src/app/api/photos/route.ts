import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function getAuthenticatedDrive() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );

  // Use service account or stored refresh token for server-side authentication
  if (process.env.GOOGLE_REFRESH_TOKEN) {
    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });
  }

  return google.drive({ version: 'v3', auth: oauth2Client });
}

export async function GET() {
  try {
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    
    if (!folderId) {
      return NextResponse.json(
        { error: 'GOOGLE_DRIVE_FOLDER_ID environment variable not configured' },
        { status: 500 }
      );
    }

    const drive = getAuthenticatedDrive();

    const response = await drive.files.list({
      q: `'${folderId}' in parents and trashed=false and mimeType contains 'image/'`,
      fields: 'files(id,name,mimeType,webViewLink,thumbnailLink,createdTime,modifiedTime,size,parents)',
      orderBy: 'createdTime desc',
      pageSize: 100,
    });

    const files = response.data.files || [];
    
    const processedFiles = files.map((file) => ({
      id: file.id,
      name: file.name,
      mimeType: file.mimeType,
      webViewLink: file.webViewLink,
      thumbnailLink: file.thumbnailLink,
      createdTime: file.createdTime,
      modifiedTime: file.modifiedTime,
      size: file.size,
      parents: file.parents,
    }));

    return NextResponse.json(processedFiles);
  } catch (error) {
    console.error('Photos fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch photos' },
      { status: 500 }
    );
  }
}