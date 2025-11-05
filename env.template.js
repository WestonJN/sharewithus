// Environment Configuration Template
// This file will be processed during deployment to inject environment variables
// DO NOT commit actual credentials to version control

window.ENV = {
    // These placeholders will be replaced during build/deployment
    GOOGLE_CLIENT_ID: '${GOOGLE_CLIENT_ID}',
    GOOGLE_API_KEY: '${GOOGLE_API_KEY}',
    GOOGLE_FOLDER_ID: '${GOOGLE_FOLDER_ID}',
    
    // Environment detection
    ENVIRONMENT: '${NODE_ENV}',
    IS_PRODUCTION: '${NODE_ENV}' === 'production'
};
