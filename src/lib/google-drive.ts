export interface GoogleDriveFile {
  id: string;
  name: string;
  mimeType: string;
  webViewLink: string;
  thumbnailLink?: string;
  createdTime: string;
  modifiedTime: string;
  size?: string;
  parents?: string[];
}


export class GoogleDriveService {
  getImageUrl(fileId: string, size: 'thumbnail' | 'medium' | 'large' = 'medium'): string {
    return `/api/image/${fileId}?size=${size}`;
  }

  getDirectImageUrl(fileId: string): string {
    return `/api/image/${fileId}`;
  }
}

export const googleDriveService = new GoogleDriveService();