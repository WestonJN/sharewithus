// Setup script for local development environment
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🔧 Wedding Photo Upload - Environment Setup');
console.log('==========================================\n');

async function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer.trim());
        });
    });
}

async function setupEnvironment() {
    console.log('This script will help you set up your local development environment.');
    console.log('You can find these values in your Google Cloud Console.\n');
    
    const clientId = await askQuestion('Enter your Google Client ID: ');
    const apiKey = await askQuestion('Enter your Google API Key: ');
    const folderId = await askQuestion('Enter your Google Drive Folder ID: ');
    
    // Create local environment file
    const envContent = `// Local development environment configuration
// DO NOT commit this file to version control

window.ENV = {
    GOOGLE_CLIENT_ID: '${clientId}',
    GOOGLE_API_KEY: '${apiKey}',
    GOOGLE_FOLDER_ID: '${folderId}',
    ENVIRONMENT: 'development',
    IS_PRODUCTION: false
};

console.log('🔧 Development environment loaded');
`;

    fs.writeFileSync('env.js', envContent);
    
    console.log('\n✅ Environment setup complete!');
    console.log('📁 Created: env.js (for local development)');
    console.log('\n🔒 Security reminders:');
    console.log('- env.js is in .gitignore and won\'t be committed');
    console.log('- For production, use Vercel environment variables');
    console.log('- Never commit API keys to version control\n');
    
    rl.close();
}

setupEnvironment().catch(console.error);
