# Google Drive Configuration Setup

To enable Google Drive integration for the wedding photo upload app, you'll need to:

## 1. Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Drive API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Drive API"
   - Click on it and press "Enable"

## 2. Create Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
   - Copy the API key
3. Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Add your domain to "Authorized JavaScript origins"
   - For local testing, add: `http://localhost:3000` and `http://127.0.0.1:3000`
   - Copy the Client ID

## 3. Create a Shared Google Drive Folder

1. Go to [Google Drive](https://drive.google.com)
2. Create a new folder for wedding photos
3. Right-click the folder > "Share"
4. Set permissions as needed
5. Copy the folder ID from the URL (the part after `/folders/`)

## 4. Update Configuration

Open `script.js` and update the configuration object:

```javascript
const CONFIG = {
    GOOGLE_DRIVE: {
        CLIENT_ID: 'your-client-id-here',
        API_KEY: 'your-api-key-here',
        FOLDER_ID: 'your-folder-id-here'
    }
};
```

## 5. Security Notes

- Never commit API keys to public repositories
- Use environment variables for production
- Consider using a backend service for production deployments
- Regularly rotate API keys
- Set up proper OAuth scopes

## Demo Mode

For testing without Google Drive setup, uncomment the last line in `script.js`:
```javascript
enableDemoMode();
```

This will simulate the upload process without actually uploading files.
