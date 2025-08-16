# Google Drive Auto-Save Setup Guide

This guide explains how to set up Google Drive integration for automatic vocabulary backup in the English Learning Web App.

## 🔧 Prerequisites

- Google Account
- Google Cloud Console access
- Modern browser (Chrome, Firefox, Edge)

## 🚀 Google Cloud Console Setup

### Step 1: Create or Select a Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note down your project ID

### Step 2: Enable Google Drive API

1. Navigate to "APIs & Services" > "Library"
2. Search for "Google Drive API"
3. Click "Enable"

### Step 3: Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type
3. Fill in the required information:
   - App name: "English Learning Vocabulary App"
   - User support email: Your email
   - Authorized domains: Add your domain (e.g., localhost for development)
   - Developer contact information: Your email
4. Add the following scopes:
   - `https://www.googleapis.com/auth/drive.file`
5. Save and continue

### Step 4: Create OAuth 2.0 Client ID

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client ID"
3. Choose "Web application" as application type
4. Add authorized JavaScript origins:
   - For development: `http://localhost:3000` (or your dev port)
   - For production: Your domain (e.g., `https://yourdomain.com`)
5. Add authorized redirect URIs (if needed):
   - For development: `http://localhost:3000`
   - For production: `https://yourdomain.com`
6. Copy the Client ID

### Step 5: Create API Key

1. Click "Create Credentials" > "API Key"
2. Restrict the key (recommended):
   - Click "Restrict Key"
   - Under "API restrictions", select "Restrict key"
   - Choose "Google Drive API"
3. Copy the API Key

## ⚙️ Application Configuration

### Step 1: Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your credentials:
   ```env
   VITE_GOOGLE_CLIENT_ID=your-client-id-here
   VITE_GOOGLE_API_KEY=your-api-key-here
   ```

3. Ensure `.env` is in your `.gitignore` file

### Step 2: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the Vocabulary section
3. Open the "Save & Sync" accordion
4. Change storage type to "Google Drive"
5. Click "Sign In" to authenticate with Google

## 📱 How to Use Google Drive Auto-Save

### Initial Setup

1. **Select Storage Type**: In the Save Control Panel, choose "Google Drive" from the storage type dropdown
2. **Sign In**: Click the "Sign In" button to authenticate with your Google account
3. **Setup Auto-Save**: Click "Setup" to initialize Google Drive backup
4. **Enable Auto-Save**: Toggle the auto-save switch to enable automatic backups

### Features

- **Automatic Backup**: Vocabulary data is automatically backed up to Google Drive when auto-save is enabled
- **Manual Sync**: Click "Sync" to manually download the latest backup from Google Drive
- **Cross-Device Access**: Access your vocabulary data from any device by signing in to Google Drive
- **Conflict Resolution**: The system checks modification timestamps to prevent data conflicts

### File Storage

- Backups are stored in a dedicated folder: "Vocabulary Backup"
- File format: JSON with timestamp-based naming
- Data includes: vocabularies, custom topics, grammar rules, notes, and UI states

## 🔒 Security & Privacy

### Data Handling
- Only vocabulary-related data is uploaded to Google Drive
- Files are stored in your personal Google Drive (not accessible by others)
- Authentication tokens are stored locally and expire automatically

### Permissions
The app requests minimal permissions:
- `https://www.googleapis.com/auth/drive.file`: Access to files created by the app only

### Best Practices
- Never share your API credentials
- Use environment variables for sensitive data
- Regularly review OAuth consent screen settings
- Monitor API usage in Google Cloud Console

## 🛠️ Troubleshooting

### Common Issues

**"Google sign-in failed"**
- Check if OAuth 2.0 Client ID is correct in `.env`
- Verify authorized JavaScript origins in Google Cloud Console
- Ensure your domain is added to authorized domains

**"Google Drive save failed"**
- Check if Google Drive API is enabled
- Verify API Key permissions in Google Cloud Console
- Check browser console for detailed error messages

**"Not signed in to Google"**
- Sign out and sign in again
- Clear browser cache and cookies
- Check if OAuth consent screen is published (not in testing mode)

### Debug Mode

Enable debug logging by opening browser console and checking for:
- Authentication flow messages
- API call responses
- Error details

## 🔄 Migration from Local Files

If you were previously using local file auto-save:

1. Export your current data (Import/Export in Save Control Panel)
2. Switch to Google Drive storage type
3. Sign in and setup Google Drive
4. The system will create a new backup with your current data
5. Your local auto-save settings will be preserved

## 📊 Monitoring & Limits

### Google API Quotas
- Daily requests: Check your project's quotas in Google Cloud Console
- Rate limits: The app includes built-in throttling to prevent quota exhaustion

### Storage Limits
- Google Drive free tier: 15 GB (shared with Gmail and Photos)
- Vocabulary backup files are typically small (few KB to MB)

## 🚨 Production Deployment

### Environment Variables
Set these in your hosting platform:
```env
VITE_GOOGLE_CLIENT_ID=your-production-client-id
VITE_GOOGLE_API_KEY=your-production-api-key
```

### Domain Configuration
Update Google Cloud Console with production domains:
- OAuth 2.0 Client ID authorized origins
- API Key restrictions
- OAuth consent screen authorized domains

### SSL Certificate
Ensure your production site uses HTTPS for Google OAuth to work properly.

## 📞 Support

For issues with Google Drive integration:
1. Check this documentation first
2. Review browser console for error messages
3. Verify Google Cloud Console configuration
4. Test with a fresh Google account if needed

Remember: Google APIs may take a few minutes to propagate changes, so wait before testing after making configuration changes.
