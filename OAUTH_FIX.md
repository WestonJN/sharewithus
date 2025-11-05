# Quick OAuth Fix Guide

## The Error: "Error 401: invalid_client"

This error occurs when Google doesn't recognize your OAuth client configuration.

## Steps to Fix:

### 1. Go to Google Cloud Console
- Visit: https://console.cloud.google.com/
- Select your project (or create a new one)

### 2. Enable Google Drive API
- Go to: APIs & Services → Library
- Search: "Google Drive API"
- Click "Enable"

### 3. Create/Fix OAuth Client
- Go to: APIs & Services → Credentials
- Click: "Create Credentials" → "OAuth 2.0 Client IDs"
- Application type: "Web application"
- Name: "Wedding Photo Upload"

### 4. Configure Authorized Origins
Add these to "Authorized JavaScript origins":
```
http://localhost:3000
http://127.0.0.1:3000
https://your-domain.vercel.app
```

### 5. Get Your Credentials
- Copy the "Client ID" (looks like: xxxxx-xxxxxxx.apps.googleusercontent.com)
- Copy the "API Key" from the API Keys section

### 6. Update Local Configuration
Edit the `env.js` file and add your credentials:

```javascript
window.ENV = {
    GOOGLE_CLIENT_ID: 'your-actual-client-id-here.apps.googleusercontent.com',
    GOOGLE_API_KEY: 'your-actual-api-key-here',
    GOOGLE_FOLDER_ID: 'your-folder-id-here',
    ENVIRONMENT: 'development',
    IS_PRODUCTION: false
};
```

### 7. Test Again
- Refresh your browser
- Check the browser console for any error messages
- Try uploading a photo

## Common Issues:
- ❌ Client ID doesn't match exactly
- ❌ Missing authorized origins (localhost:3000)
- ❌ API not enabled
- ❌ Wrong application type (should be "Web application")

## Need Help?
Check the browser console (F12) for detailed error messages.
