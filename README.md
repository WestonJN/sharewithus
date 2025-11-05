# Wedding Photo Upload App 💒📸

A beautiful, single-page web application for uploading wedding photos to Google Drive. Perfect for allowing wedding guests to easily share their photos from your special day.

![Wedding Photo Upload](https://via.placeholder.com/800x400/6b73ff/ffffff?text=Wedding+Photo+Upload+App)

## ✨ Features

- **Elegant Design**: Beautiful, wedding-themed interface with romantic styling
- **Drag & Drop Upload**: Intuitive file upload with drag-and-drop support
- **Progress Tracking**: Real-time upload progress bars for each file
- **Guest Names**: Optional guest name field to organize photos
- **Mobile Responsive**: Works perfectly on all devices and screen sizes
- **Google Drive Integration**: Secure upload directly to your Google Drive
- **File Validation**: Supports multiple image formats with size limits
- **Privacy Focused**: Secure handling of photos and guest data
- **Modern Web Standards**: Built with HTML5, CSS3, and vanilla JavaScript

## 🚀 Quick Start

### Option 1: Simple Setup (No Server Required)
1. Download or clone this repository
2. Open `index.html` in your web browser
3. The app will work with basic functionality, but Google Drive integration requires setup (see below)

### Option 2: Local Development Server

**Using Python (if installed):**
```bash
python -m http.server 3000
```

**Using Node.js:**
```bash
npx serve -s . -p 3000
```

**Using VS Code Live Server:**
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html` → "Open with Live Server"

Then open your browser to `http://localhost:3000`

## 🔧 Google Drive Setup

To enable Google Drive integration, you'll need to set up Google Cloud credentials:

1. **Create a Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable the Google Drive API

2. **Create Credentials**
   - Create an API Key
   - Create OAuth 2.0 Client ID
   - Add your domain to authorized origins

3. **Configure the App**
   - Open `script.js`
   - Update the `CONFIG` object with your credentials:
   ```javascript
   const CONFIG = {
       GOOGLE_DRIVE: {
           CLIENT_ID: 'your-client-id-here',
           API_KEY: 'your-api-key-here',
           FOLDER_ID: 'your-folder-id-here'
       }
   };
   ```

📋 **Detailed setup instructions:** See `GOOGLE_DRIVE_SETUP.md`

## 🎮 Demo Mode

For testing without Google Drive setup, enable demo mode by uncommenting the last line in `script.js`:

```javascript
enableDemoMode();
```

This simulates the upload process without actually uploading files.

## 📱 Usage

1. **Guest Name (Optional)**: Guests can enter their name to help organize photos
2. **Upload Photos**: 
   - Drag and drop photos onto the upload area, or
   - Click to browse and select files
3. **Monitor Progress**: Watch real-time upload progress for each file
4. **Manage Files**: Remove files before uploading if needed
5. **Upload to Drive**: Click "Upload Photos to Drive" to start the process

## 🛠️ Technical Details

### Supported File Types
- JPEG/JPG
- PNG
- HEIC
- WebP
- TIFF
- BMP

### File Limits
- Maximum file size: 100MB per file (increased capacity)
- Maximum files: 100 files per session
- Supports resumable uploads for large files

### Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge

### Dependencies
- Google APIs JavaScript client library (loaded via CDN)
- Font Awesome icons (loaded via CDN)
- Google Fonts (loaded via CDN)

## 🎨 Customization

### Styling
- Edit `styles.css` to customize colors, fonts, and layout
- The app uses CSS custom properties for easy theme changes

### Configuration
- Modify `CONFIG` object in `script.js` for:
  - File size limits
  - Accepted file types
  - Maximum number of files

### Features
- Add new file types to `ACCEPTED_TYPES` array
- Customize upload behavior in the upload functions
- Modify form fields in `index.html`

## 🔒 Security & Privacy

- Photos are uploaded directly to your Google Drive
- No photos are stored on intermediate servers
- Google OAuth provides secure authentication
- API keys should be kept secure and rotated regularly
- Consider using environment variables for production

## 📋 VS Code Tasks

The project includes several VS Code tasks:

- **Start Development Server (Python)**: Uses Python's built-in server
- **Start Development Server (Node.js)**: Uses npx serve
- **Open with Live Server**: Instructions for using Live Server extension

Access tasks via: `Ctrl+Shift+P` → "Tasks: Run Task"

## 🚀 Deployment

### Vercel (Recommended)
Vercel offers the best performance with automatic HTTPS, global CDN, and seamless deployment:

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/)
3. Sign in with GitHub
4. Click "New Project" and import your repository
5. Deploy with default settings
6. Update Google OAuth settings with your new Vercel domain

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to Settings → Pages
3. Select source branch
4. Your app will be available at `https://yourusername.github.io/repository-name`

### Netlify
1. Connect your GitHub repository to Netlify
2. Deploy with default settings
3. Update Google OAuth settings with your new domain

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the browser console for error messages
2. Verify Google Drive setup is correct
3. Ensure all required files are present
4. Try enabling demo mode for testing

## 🎉 Perfect for:

- Wedding receptions
- Engagement parties
- Anniversary celebrations
- Family gatherings
- Any special event where you want guests to share photos

---

**Made with 💖 for your special day**
