# 🚀 Deployment Guide

## Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right → "New repository"
3. Name your repository (e.g., "wedding-photo-upload")
4. Make it public (required for free GitHub Pages)
5. Don't initialize with README (we already have one)
6. Click "Create repository"

## Step 2: Push to GitHub

Run these commands in your terminal:

```bash
# Add GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPOSITORY_NAME` with your actual GitHub username and repository name.

## Step 3: Deploy to Vercel (Recommended)

Vercel is recommended because it offers:
- ✅ Automatic HTTPS
- ✅ Global CDN for fast loading
- ✅ Automatic deployments on every push
- ✅ Custom domains
- ✅ Better performance than GitHub Pages

### Deploy Steps:

1. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/sign in with your GitHub account
   - Click "New Project"

2. **Import Repository:**
   - Select your wedding photo upload repository
   - Click "Import"

3. **Configure Deployment:**
   - Project Name: Leave as default or customize
   - Framework Preset: Select "Other" (static site)
   - Root Directory: Leave as "./"
   - Build Command: Leave empty
   - Output Directory: Leave as "./"
   - Install Command: Leave empty

4. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete (~1-2 minutes)
   - Your app will be available at `https://your-project-name.vercel.app`

5. **Custom Domain (Optional):**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

## Step 4: Configure Google Drive API

After deployment, update your Google Drive API settings:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to APIs & Services → Credentials
3. Edit your OAuth 2.0 Client ID
4. Add your Vercel domain to "Authorized JavaScript origins":
   ```
   https://your-project-name.vercel.app
   ```
5. Update the configuration in your `script.js` file with your credentials

## Step 5: Test Your Deployment

1. Visit your Vercel URL
2. Test the upload functionality
3. Verify Google Drive integration works
4. Test on mobile devices

## Alternative: GitHub Pages

If you prefer GitHub Pages (free but with limitations):

1. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click Settings → Pages
   - Source: Deploy from a branch
   - Branch: main / (root)
   - Click Save

2. **Access Your Site:**
   - Your app will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME`
   - It may take a few minutes to deploy

3. **Update Google Drive API:**
   - Add your GitHub Pages URL to OAuth settings

## Automatic Deployments

Both Vercel and GitHub Pages will automatically redeploy when you push changes to your main branch.

## Performance Tips

1. **Optimize Images:** Compress any background images
2. **Enable Caching:** Vercel handles this automatically
3. **Monitor Performance:** Use Vercel Analytics or Google PageSpeed Insights
4. **Custom Domain:** Improves loading speed and looks professional

## Troubleshooting

### Common Issues:

1. **Google Drive not working:**
   - Check OAuth domain configuration
   - Verify API keys are correct
   - Enable demo mode for testing

2. **HTTPS Required:**
   - Google APIs require HTTPS
   - Both Vercel and GitHub Pages provide HTTPS automatically

3. **File Upload Errors:**
   - Check file size limits
   - Verify Google Drive folder permissions

### Getting Help:

- Check browser console for error messages
- Verify all configuration steps
- Enable demo mode to test without Google Drive
- Check the README.md for detailed instructions

---

🎉 **Your wedding photo upload app is now live and ready for guests to use!**
