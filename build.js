// Build script for injecting environment variables into client-side code
const fs = require('fs');
const path = require('path');

// Create dist directory
const distDir = './dist';
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Environment variables from Vercel/deployment platform
const env = {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || '',
    GOOGLE_FOLDER_ID: process.env.GOOGLE_FOLDER_ID || '',
    ENVIRONMENT: process.env.NODE_ENV || 'production',
    IS_PRODUCTION: process.env.NODE_ENV === 'production'
};

// Generate environment configuration file
const envConfig = `// Auto-generated environment configuration - DO NOT EDIT
window.ENV = ${JSON.stringify(env, null, 2)};

// Environment validation
if (window.ENV.IS_PRODUCTION && (!window.ENV.GOOGLE_CLIENT_ID || !window.ENV.GOOGLE_API_KEY)) {
    console.warn('Production environment detected but Google API credentials are missing');
}
`;

// Copy and process files
const filesToCopy = [
    'index.html',
    'styles.css', 
    'script.js',
    'package.json',
    'README.md'
];

// Copy static files
filesToCopy.forEach(file => {
    if (fs.existsSync(file)) {
        fs.copyFileSync(file, path.join(distDir, file));
        console.log(`✓ Copied ${file}`);
    }
});

// Write environment configuration
fs.writeFileSync(path.join(distDir, 'env.js'), envConfig);
console.log('✓ Generated env.js with environment variables');

// Update HTML to use correct paths (if needed)
const htmlPath = path.join(distDir, 'index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Ensure environment is loaded first
if (!htmlContent.includes('<script src="env.js"></script>')) {
    htmlContent = htmlContent.replace(
        '<script src="script.js"></script>',
        '<script src="env.js"></script>\n    <script src="script.js"></script>'
    );
    fs.writeFileSync(htmlPath, htmlContent);
    console.log('✓ Updated HTML to load environment configuration');
}

console.log('🎉 Build completed successfully!');
console.log(`📁 Output directory: ${distDir}`);

// Validate environment variables in production
if (process.env.NODE_ENV === 'production') {
    const requiredEnvVars = ['GOOGLE_CLIENT_ID', 'GOOGLE_API_KEY', 'GOOGLE_FOLDER_ID'];
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
        console.warn('⚠️  Warning: Missing required environment variables:', missingVars.join(', '));
        console.warn('   The app may not function correctly without these variables.');
    } else {
        console.log('✅ All required environment variables are present');
    }
}
