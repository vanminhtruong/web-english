import { j as googleDriveAuth } from "./index-CieoXZUQ.js";
import "./vendor-DoTKyHPB.js";
import "./vendor-toast-D1B2ty4j.js";
class GoogleDriveFileService {
  static instance;
  constructor() {
  }
  static getInstance() {
    if (!GoogleDriveFileService.instance) {
      GoogleDriveFileService.instance = new GoogleDriveFileService();
    }
    return GoogleDriveFileService.instance;
  }
  /**
   * List JSON files from Google Drive
   */
  async listJSONFiles() {
    try {
      if (!googleDriveAuth.isSignedIn()) {
        throw new Error("Not signed in to Google Drive");
      }
      console.log("📁 Fetching JSON files from Google Drive...");
      const response = await gapi.client.drive.files.list({
        q: "mimeType='application/json' or name contains '.json'",
        fields: "files(id,name,size,modifiedTime,mimeType)",
        orderBy: "modifiedTime desc",
        pageSize: 50
      });
      const files = response.result.files || [];
      console.log(`📋 Found ${files.length} JSON files`);
      return files.map((file) => ({
        id: file.id,
        name: file.name,
        size: this.formatFileSize(parseInt(file.size || "0")),
        modifiedTime: this.formatDate(file.modifiedTime),
        mimeType: file.mimeType
      }));
    } catch (error) {
      console.error("❌ Error listing Google Drive files:", error);
      throw new Error("Failed to fetch files from Google Drive");
    }
  }
  /**
   * Download file content from Google Drive
   */
  async downloadFile(fileId) {
    try {
      if (!googleDriveAuth.isSignedIn()) {
        throw new Error("Not signed in to Google Drive");
      }
      console.log(`📥 Downloading file from Google Drive: ${fileId}`);
      const response = await gapi.client.drive.files.get({
        fileId,
        alt: "media"
      });
      console.log("✅ File downloaded successfully");
      return response.body;
    } catch (error) {
      console.error("❌ Error downloading file:", error);
      throw new Error("Failed to download file from Google Drive");
    }
  }
  /**
   * Get file metadata from Google Drive
   */
  async getFileMetadata(fileId) {
    try {
      if (!googleDriveAuth.isSignedIn()) {
        throw new Error("Not signed in to Google Drive");
      }
      const response = await gapi.client.drive.files.get({
        fileId,
        fields: "id,name,size,modifiedTime,mimeType"
      });
      return response.result;
    } catch (error) {
      console.error("❌ Error getting file metadata:", error);
      throw new Error("Failed to get file metadata");
    }
  }
  /**
   * Format file size in human readable format
   */
  formatFileSize(bytes) {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  }
  /**
   * Format date in readable format
   */
  formatDate(dateString) {
    try {
      const date = new Date(dateString);
      const now = /* @__PURE__ */ new Date();
      const diffTime = now.getTime() - date.getTime();
      const diffDays = Math.floor(diffTime / (1e3 * 60 * 60 * 24));
      if (diffDays === 0) {
        return "Today";
      } else if (diffDays === 1) {
        return "Yesterday";
      } else if (diffDays < 7) {
        return `${diffDays} days ago`;
      } else {
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric"
        });
      }
    } catch (error) {
      return dateString;
    }
  }
}
const googleDriveFileService = GoogleDriveFileService.getInstance();
export {
  GoogleDriveFileService,
  googleDriveFileService
};
//# sourceMappingURL=googleDriveFileService-C-FNODSl.js.map
