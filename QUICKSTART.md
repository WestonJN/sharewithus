# 🎯 Quick Start Guide

## For Immediate Local Testing

1. **Open the App:**
   - Double-click `index.html` to open in your browser
   - Or use VS Code's "Live Server" extension

2. **Enable Demo Mode:**
   - Open `script.js`
   - Uncomment the last line: `enableDemoMode();`
   - This simulates uploads without Google Drive

3. **Test Features:**
   - Drag and drop photos
   - Enter guest name
   - Click upload to see progress bars
   - All features work except actual Google Drive upload

## For Production Use

1. **Follow DEPLOYMENT.md** to deploy to Vercel or GitHub Pages
2. **Set up Google Drive** following GOOGLE_DRIVE_SETUP.md
3. **Configure your credentials** in script.js
4. **Test with real uploads**

## Quick Commands

```bash
# Run local server (if Python installed)
python -m http.server 3000

# Or with Node.js
npx serve -s . -p 3000

# Initialize Git (if needed)
git init
git add .
git commit -m "Initial commit"
```

## Color Scheme

The app now uses a modern wedding color palette:
- Cream Light: #f7e6ca
- Cream Medium: #d4c8b7  
- Gold Light: #c8a47b
- Brown Medium: #96765a
- Black: #000000

## Enhanced Features

✅ 100MB file size limit (increased from 10MB)  
✅ 100 files per session (increased from 50)  
✅ Resumable uploads for large files  
✅ Modern color scheme with elegant design  
✅ Better mobile responsiveness  
✅ Enhanced security headers  
✅ Optimized for Vercel deployment  

## Need Help?

1. Check the browser console for errors
2. Read README.md for detailed instructions  
3. Enable demo mode for testing
4. Follow DEPLOYMENT.md for going live
