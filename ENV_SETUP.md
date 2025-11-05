# 🔐 Environment Variables Setup Guide

## Security Best Practices

Your API credentials are now configured to use environment variables for production deployment while keeping your development workflow simple.

## 🏠 Local Development Setup

### Option 1: Automatic Setup (Recommended)
```bash
npm run env:setup
```
This will prompt you for your credentials and create a local `env.js` file.

### Option 2: Manual Setup
1. Copy your credentials (already in your current `script.js`)
2. Create a local `env.js` file:
```javascript
window.ENV = {
    GOOGLE_CLIENT_ID: 'your-client-id-here',
    GOOGLE_API_KEY: 'your-api-key-here', 
    GOOGLE_FOLDER_ID: 'your-folder-id-here',
    ENVIRONMENT: 'development',
    IS_PRODUCTION: false
};
```

## 🚀 Production Deployment (Vercel)

### Step 1: Remove Credentials from Code
Your `script.js` now uses environment variables, so your credentials won't be exposed in the code.

### Step 2: Set Environment Variables in Vercel

1. **Go to your Vercel Dashboard**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Select your project

2. **Navigate to Settings**
   - Click on your project
   - Go to "Settings" tab
   - Click "Environment Variables"

3. **Add Your Variables**
   ```
   Variable Name: GOOGLE_CLIENT_ID
   Value: 825088894160-380fonneraolde3iu7lrfkeji1adc59t.apps.googleusercontent.com
   Environment: Production, Preview, Development
   
   Variable Name: GOOGLE_API_KEY  
   Value: AIzaSyBH36eDKqrWWu-6ffPfDiQ_zVOWrlGlieQ
   Environment: Production, Preview, Development
   
   Variable Name: GOOGLE_FOLDER_ID
   Value: 1ftA7HMju_-7pLQnvuJFNJT0_nVyZFlHc
   Environment: Production, Preview, Development
   ```

4. **Redeploy Your App**
   - After adding environment variables, trigger a new deployment
   - You can do this by pushing a new commit or manually redeploying

## 🔧 Alternative Deployment Platforms

### Netlify
1. Go to Site Settings → Environment Variables
2. Add the same variables as above
3. Redeploy your site

### GitHub Pages (Limited Support)
GitHub Pages doesn't support server-side environment variables, but you can:
1. Use GitHub Secrets for Actions
2. Create a build workflow that injects variables
3. Or keep using the fallback values (less secure)

## 🧪 Testing Environment Variables

### Check if Variables are Loaded
Add this to your browser console on your deployed site:
```javascript
console.log('Environment:', window.ENV);
```

### Validate Configuration
Your app will automatically validate required variables and show warnings if missing.

## 🔒 Security Benefits

✅ **Credentials not in code**: No longer visible in your repository  
✅ **Environment-specific**: Different values for dev/staging/prod  
✅ **Rotation-friendly**: Easy to update without code changes  
✅ **Audit trail**: Vercel tracks who changes environment variables  
✅ **Access control**: Only team members with access can view/edit  

## 🚨 Security Reminders

- ❌ **Never commit** `env.js` to version control (it's in .gitignore)
- ❌ **Don't share** API keys in chat, email, or screenshots
- ✅ **Regularly rotate** your API keys
- ✅ **Use different** credentials for development and production
- ✅ **Monitor** Google Cloud Console for unusual API usage

## 🐛 Troubleshooting

### Environment Variables Not Loading
1. Check Vercel environment variables are set correctly
2. Verify variable names match exactly (case-sensitive)
3. Redeploy after adding variables
4. Check browser console for errors

### API Still Not Working
1. Verify Google Cloud Console settings
2. Check OAuth domain configuration
3. Ensure API is enabled
4. Test with demo mode first

### Local Development Issues
1. Make sure `env.js` exists and is loaded
2. Check browser network tab for 404 errors
3. Verify credentials are correct
4. Try the setup script: `npm run env:setup`

## 📝 Current Configuration

Your app now:
- ✅ Uses environment variables in production
- ✅ Falls back to your current values for development
- ✅ Validates configuration on startup
- ✅ Provides clear error messages
- ✅ Supports multiple deployment platforms

## 🔄 Next Steps

1. **Deploy to Vercel** with environment variables
2. **Test** the deployed app thoroughly
3. **Remove** hardcoded credentials from any documentation
4. **Set up** monitoring for API usage
5. **Plan** for credential rotation schedule
