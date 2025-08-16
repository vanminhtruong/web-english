import { googleDriveAuth } from './googleDriveAuth';

// Declare gapi types
declare const gapi: any;

export interface DriveFile {
  id: string;
  name: string;
  size: string;
  modifiedTime: string;
  mimeType: string;
}

/**
 * Google Drive File Service
 * Handles file operations with Google Drive API
 */
export class GoogleDriveFileService {
  private static instance: GoogleDriveFileService;

  private constructor() {}

  public static getInstance(): GoogleDriveFileService {
    if (!GoogleDriveFileService.instance) {
      GoogleDriveFileService.instance = new GoogleDriveFileService();
    }
    return GoogleDriveFileService.instance;
  }

  /**
   * List JSON files from Google Drive
   */
  async listJSONFiles(): Promise<DriveFile[]> {
    try {
      if (!googleDriveAuth.isSignedIn()) {
        throw new Error('Not signed in to Google Drive');
      }

      console.log('📁 Fetching JSON files from Google Drive...');

      const response = await gapi.client.drive.files.list({
        q: "mimeType='application/json' or name contains '.json'",
        fields: 'files(id,name,size,modifiedTime,mimeType)',
        orderBy: 'modifiedTime desc',
        pageSize: 50
      });

      const files = response.result.files || [];
      
      console.log(`📋 Found ${files.length} JSON files`);

      return files.map((file: any) => ({
        id: file.id!,
        name: file.name!,
        size: this.formatFileSize(parseInt(file.size || '0')),
        modifiedTime: this.formatDate(file.modifiedTime!),
        mimeType: file.mimeType!
      }));

    } catch (error) {
      console.error('❌ Error listing Google Drive files:', error);
      throw new Error('Failed to fetch files from Google Drive');
    }
  }

  /**
   * Download file content from Google Drive
   */
  async downloadFile(fileId: string): Promise<string> {
    try {
      if (!googleDriveAuth.isSignedIn()) {
        throw new Error('Not signed in to Google Drive');
      }

      console.log(`📥 Downloading file from Google Drive: ${fileId}`);

      const response = await gapi.client.drive.files.get({
        fileId: fileId,
        alt: 'media'
      });

      console.log('✅ File downloaded successfully');
      return response.body;

    } catch (error) {
      console.error('❌ Error downloading file:', error);
      throw new Error('Failed to download file from Google Drive');
    }
  }

  /**
   * Get file metadata from Google Drive
   */
  async getFileMetadata(fileId: string): Promise<any> {
    try {
      if (!googleDriveAuth.isSignedIn()) {
        throw new Error('Not signed in to Google Drive');
      }

      const response = await gapi.client.drive.files.get({
        fileId: fileId,
        fields: 'id,name,size,modifiedTime,mimeType'
      });

      return response.result;

    } catch (error) {
      console.error('❌ Error getting file metadata:', error);
      throw new Error('Failed to get file metadata');
    }
  }

  /**
   * Format file size in human readable format
   */
  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  }

  /**
   * Format date in readable format
   */
  private formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = now.getTime() - date.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) {
        return 'Today';
      } else if (diffDays === 1) {
        return 'Yesterday';
      } else if (diffDays < 7) {
        return `${diffDays} days ago`;
      } else {
        return date.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        });
      }
    } catch (error) {
      return dateString;
    }
  }
}

// Export singleton instance
export const googleDriveFileService = GoogleDriveFileService.getInstance();
