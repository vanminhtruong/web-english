import { googleDriveAuth } from './googleDriveAuth';

export interface DriveFile {
  id: string;
  name: string;
  modifiedTime: string;
  size: string;
  mimeType: string;
}

export interface UploadOptions {
  fileName: string;
  data: any;
  folderId?: string;
  description?: string;
}

export interface DownloadResult {
  success: boolean;
  data?: any;
  error?: string;
  lastModified?: string;
}

/**
 * Google Drive API Service
 * Handles file operations on Google Drive
 */
export class GoogleDriveApi {
  private static instance: GoogleDriveApi;
  private readonly VOCABULARY_FOLDER_NAME = 'Vocabulary Backup';
  private readonly BACKUP_FILE_NAME = 'vocabulary-auto-backup.json';
  private vocabularyFolderId: string | null = null;

  private constructor() {}

  public static getInstance(): GoogleDriveApi {
    if (!GoogleDriveApi.instance) {
      GoogleDriveApi.instance = new GoogleDriveApi();
    }
    return GoogleDriveApi.instance;
  }

  /**
   * Ensure user is authenticated before making API calls
   */
  private async ensureAuthenticated(): Promise<boolean> {
    // Check if user is signed in with async validation
    if (!(await googleDriveAuth.isSignedIn())) {
      console.log('⚠️ User not signed in, attempting to sign in...');
      return await googleDriveAuth.signIn();
    }
    return true;
  }

  /**
   * Handle 401 errors by refreshing token and retrying
   */
  private async handleAuthError(operation: () => Promise<Response>): Promise<Response> {
    try {
      const response = await operation();
      
      if (response.status === 401) {
        console.log('🔄 Received 401 error, attempting token refresh...');
        
        // Try to get a fresh token
        const newToken = await googleDriveAuth.getAccessToken();
        if (!newToken) {
          throw new Error('Unable to refresh authentication token');
        }
        
        // Retry the operation with fresh token
        console.log('♻️ Retrying operation with refreshed token...');
        const retryResponse = await operation();
        
        if (retryResponse.status === 401) {
          throw new Error('Authentication failed even after token refresh');
        }
        
        return retryResponse;
      }
      
      return response;
    } catch (error) {
      console.error('❌ Auth error handling failed:', error);
      throw error;
    }
  }

  /**
   * Find or create the vocabulary backup folder
   */
  async findOrCreateVocabularyFolder(): Promise<string | null> {
    try {
      if (!await this.ensureAuthenticated()) {
        throw new Error('Authentication failed');
      }

      console.log('📁 Finding or creating vocabulary backup folder...');

      // Search for existing folder
      const response = await window.gapi.client.drive.files.list({
        q: `name='${this.VOCABULARY_FOLDER_NAME}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
        spaces: 'drive',
        fields: 'files(id, name)',
      });

      if (response.result.files && response.result.files.length > 0) {
        this.vocabularyFolderId = response.result.files[0].id;
        console.log('✅ Found existing vocabulary folder:', this.vocabularyFolderId);
        return this.vocabularyFolderId;
      }

      // Create new folder if not found
      const createResponse = await window.gapi.client.drive.files.create({
        resource: {
          name: this.VOCABULARY_FOLDER_NAME,
          mimeType: 'application/vnd.google-apps.folder',
          description: 'Automatically created folder for vocabulary backup files',
        },
        fields: 'id',
      });

      this.vocabularyFolderId = createResponse.result.id;
      console.log('✅ Created new vocabulary folder:', this.vocabularyFolderId);
      return this.vocabularyFolderId;

    } catch (error) {
      console.error('❌ Failed to find or create vocabulary folder:', error);
      return null;
    }
  }

  /**
   * Upload vocabulary data to Google Drive
   */
  async uploadVocabularyData(data: any): Promise<{ success: boolean; fileId?: string; error?: string }> {
    let dataSizeKB = 0;
    
    try {
      if (!await this.ensureAuthenticated()) {
        throw new Error('Authentication failed');
      }

      console.log('📤 Starting vocabulary data upload to Google Drive...');

      // Ensure vocabulary folder exists
      const folderId = await this.findOrCreateVocabularyFolder();
      if (!folderId) {
        throw new Error('Failed to create vocabulary folder');
      }

      // Check if backup file already exists
      const existingFile = await this.findVocabularyBackupFile();
      
      const jsonData = JSON.stringify(data, null, 2);
      dataSizeKB = Math.round(jsonData.length / 1024);
      console.log(`📊 Preparing upload: ${dataSizeKB}KB of vocabulary data`);
      
      const blob = new Blob([jsonData], { type: 'application/json' });

      let response;

      if (existingFile) {
        // Update existing file
        console.log('🔄 Updating existing backup file:', existingFile.id);
        
        const createUpdateRequest = async (): Promise<Response> => {
          const accessToken = await googleDriveAuth.getAccessToken();
          if (!accessToken) {
            throw new Error('No access token available');
          }
          
          console.log(`🔄 Starting update request for ${dataSizeKB}KB data...`);
          
          const form = new FormData();
          form.append('metadata', new Blob([JSON.stringify({
            name: this.BACKUP_FILE_NAME,
            description: `Vocabulary backup - Updated: ${new Date().toISOString()}`,
          })], { type: 'application/json' }));
          form.append('file', blob);

          const controller = new AbortController();
          // Dynamic timeout: 1min base + 1min per MB, max 10min
          const timeoutMs = Math.max(60000, Math.min(600000, 60000 + (dataSizeKB * 60))); // 1-10min range
          const timeoutMinutes = Math.round(timeoutMs / 60000);
          
          console.log(`⏱️ Setting ${timeoutMinutes} minute timeout for ${dataSizeKB}KB file`);
          const timeoutId = setTimeout(() => {
            console.log(`⏰ Upload timeout after ${timeoutMinutes} minutes, aborting request...`);
            controller.abort();
          }, timeoutMs);

          try {
            const response = await fetch(`https://www.googleapis.com/upload/drive/v3/files/${existingFile.id}?uploadType=multipart&fields=id,name,modifiedTime,size`, {
              method: 'PATCH',
              headers: {
                'Authorization': `Bearer ${accessToken}`,
              },
              body: form,
              signal: controller.signal,
            });
            
            clearTimeout(timeoutId);
            console.log(`✅ Update request completed with status: ${response.status}`);
            return response;
          } catch (error) {
            clearTimeout(timeoutId);
            if ((error as Error).name === 'AbortError') {
              throw new Error(`Upload timeout after ${timeoutMinutes} minutes for ${dataSizeKB}KB file`);
            }
            throw error;
          }
        };
        
        response = await this.handleAuthError(createUpdateRequest);

      } else {
        // Create new file
        console.log('📄 Creating new backup file...');
        
        const createNewRequest = async (): Promise<Response> => {
          const accessToken = await googleDriveAuth.getAccessToken();
          if (!accessToken) {
            throw new Error('No access token available');
          }
          
          console.log(`📄 Starting new file creation for ${dataSizeKB}KB data...`);
          
          const form = new FormData();
          form.append('metadata', new Blob([JSON.stringify({
            name: this.BACKUP_FILE_NAME,
            parents: [folderId],
            description: `Vocabulary backup - Created: ${new Date().toISOString()}`,
          })], { type: 'application/json' }));
          form.append('file', blob);

          const controller = new AbortController();
          // Dynamic timeout: 1min base + 1min per MB, max 10min
          const timeoutMs = Math.max(60000, Math.min(600000, 60000 + (dataSizeKB * 60))); // 1-10min range
          const timeoutMinutes = Math.round(timeoutMs / 60000);
          
          console.log(`⏱️ Setting ${timeoutMinutes} minute timeout for ${dataSizeKB}KB file`);
          const timeoutId = setTimeout(() => {
            console.log(`⏰ Upload timeout after ${timeoutMinutes} minutes, aborting request...`);
            controller.abort();
          }, timeoutMs);

          try {
            const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,modifiedTime,size', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${accessToken}`,
              },
              body: form,
              signal: controller.signal,
            });
            
            clearTimeout(timeoutId);
            console.log(`✅ New file creation completed with status: ${response.status}`);
            return response;
          } catch (error) {
            clearTimeout(timeoutId);
            if ((error as Error).name === 'AbortError') {
              throw new Error(`Upload timeout after ${timeoutMinutes} minutes for ${dataSizeKB}KB file`);
            }
            throw error;
          }
        };
        
        response = await this.handleAuthError(createNewRequest);
      }

      console.log(`🔍 Checking response status: ${response.status}`);
      
      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error');
        console.error(`❌ HTTP error ${response.status} for ${dataSizeKB}KB upload:`, errorText);
        
        if (response.status === 401) {
          throw new Error('Authentication failed - please sign in to Google Drive again');
        } else if (response.status === 403) {
          throw new Error('Permission denied - please check Google Drive permissions');
        } else if (response.status === 413) {
          throw new Error(`File too large (${dataSizeKB}KB) - Google Drive limit exceeded`);
        } else if (response.status === 429) {
          throw new Error('Rate limit exceeded - please try again later');
        } else {
          throw new Error(`Upload failed with status ${response.status}: ${errorText}`);
        }
      }

      console.log('📥 Parsing response JSON...');
      const result = await response.json();
      console.log(`✅ Vocabulary data (${dataSizeKB}KB) uploaded successfully:`, {
        fileId: result.id,
        fileName: result.name,
        size: result.size,
        modifiedTime: result.modifiedTime
      });

      return {
        success: true,
        fileId: result.id,
      };

    } catch (error) {
      const errorMessage = (error as Error).message;
      const sizeInfo = typeof dataSizeKB !== 'undefined' ? `${dataSizeKB}KB` : 'unknown size';
      console.error(`❌ Failed to upload vocabulary data (${sizeInfo}):`, {
        error: errorMessage,
        stack: (error as Error).stack
      });
      
      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  /**
   * Download vocabulary data from Google Drive
   */
  async downloadVocabularyData(): Promise<DownloadResult> {
    try {
      if (!await this.ensureAuthenticated()) {
        throw new Error('Authentication failed');
      }

      console.log('⬇️ Starting vocabulary data download from Google Drive...');

      // Find the backup file
      const backupFile = await this.findVocabularyBackupFile();
      if (!backupFile) {
        return {
          success: false,
          error: 'No vocabulary backup file found on Google Drive',
        };
      }

      console.log('📄 Found backup file:', backupFile.name, backupFile.id);

      // Download file content
      const response = await window.gapi.client.drive.files.get({
        fileId: backupFile.id,
        alt: 'media',
      });

      if (!response.body) {
        throw new Error('Empty response body');
      }

      // Parse JSON data
      const data = JSON.parse(response.body);
      console.log('✅ Vocabulary data downloaded successfully');

      return {
        success: true,
        data: data,
        lastModified: backupFile.modifiedTime,
      };

    } catch (error) {
      console.error('❌ Failed to download vocabulary data:', error);
      return {
        success: false,
        error: (error as Error).message,
      };
    }
  }

  /**
   * Find the vocabulary backup file in the vocabulary folder
   */
  private async findVocabularyBackupFile(): Promise<DriveFile | null> {
    try {
      const folderId = await this.findOrCreateVocabularyFolder();
      if (!folderId) return null;

      const response = await window.gapi.client.drive.files.list({
        q: `name='${this.BACKUP_FILE_NAME}' and parents in '${folderId}' and trashed=false`,
        spaces: 'drive',
        fields: 'files(id, name, modifiedTime, size, mimeType)',
      });

      if (response.result.files && response.result.files.length > 0) {
        return response.result.files[0] as DriveFile;
      }

      return null;

    } catch (error) {
      console.error('❌ Failed to find vocabulary backup file:', error);
      return null;
    }
  }

  /**
   * Get vocabulary backup file info
   */
  async getVocabularyBackupInfo(): Promise<{ exists: boolean; file?: DriveFile; error?: string }> {
    try {
      if (!await this.ensureAuthenticated()) {
        throw new Error('Authentication failed');
      }

      const backupFile = await this.findVocabularyBackupFile();
      
      return {
        exists: !!backupFile,
        file: backupFile || undefined,
      };

    } catch (error) {
      return {
        exists: false,
        error: (error as Error).message,
      };
    }
  }

  /**
   * Delete vocabulary backup file
   */
  async deleteVocabularyBackup(): Promise<{ success: boolean; error?: string }> {
    try {
      if (!await this.ensureAuthenticated()) {
        throw new Error('Authentication failed');
      }

      const backupFile = await this.findVocabularyBackupFile();
      if (!backupFile) {
        return { success: true }; // File doesn't exist, consider it deleted
      }

      await window.gapi.client.drive.files.delete({
        fileId: backupFile.id,
      });

      console.log('🗑️ Vocabulary backup file deleted successfully');
      return { success: true };

    } catch (error) {
      console.error('❌ Failed to delete vocabulary backup:', error);
      return {
        success: false,
        error: (error as Error).message,
      };
    }
  }

  /**
   * Check if there are any conflicts between local and remote data
   */
  async checkForConflicts(localData: any): Promise<{ 
    hasConflicts: boolean; 
    localModified?: string; 
    remoteModified?: string; 
    remoteData?: any;
    error?: string;
  }> {
    try {
      const downloadResult = await this.downloadVocabularyData();
      
      if (!downloadResult.success) {
        return { 
          hasConflicts: false,
          error: downloadResult.error,
        };
      }

      const localModified = localData.exportDate || new Date().toISOString();
      const remoteModified = downloadResult.lastModified;

      // Compare modification times
      const hasConflicts = new Date(remoteModified!) > new Date(localModified);

      return {
        hasConflicts,
        localModified,
        remoteModified,
        remoteData: downloadResult.data,
      };

    } catch (error) {
      return {
        hasConflicts: false,
        error: (error as Error).message,
      };
    }
  }
}

// Export composable for use in components
export const useGoogleDriveApi = () => {
  const driveApi = GoogleDriveApi.getInstance();

  return {
    uploadVocabularyData: (data: any) => driveApi.uploadVocabularyData(data),
    downloadVocabularyData: () => driveApi.downloadVocabularyData(),
    getVocabularyBackupInfo: () => driveApi.getVocabularyBackupInfo(),
    deleteVocabularyBackup: () => driveApi.deleteVocabularyBackup(),
    checkForConflicts: (localData: any) => driveApi.checkForConflicts(localData),
  };
};

// Export singleton instance
export const googleDriveApi = GoogleDriveApi.getInstance();
