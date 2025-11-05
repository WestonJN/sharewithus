// Configuration with environment variable support
const CONFIG = {
    // Google Drive API configuration
    GOOGLE_DRIVE: {
        CLIENT_ID: window.ENV?.GOOGLE_CLIENT_ID || '825088894160-380fonneraolde3iu7lrfkeji1adc59t.apps.googleusercontent.com',
        API_KEY: window.ENV?.GOOGLE_API_KEY || 'AIzaSyBH36eDKqrWWu-6ffPfDiQ_zVOWrlGlieQ',
        DISCOVERY_DOC: 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
        SCOPES: 'https://www.googleapis.com/auth/drive.file',
        FOLDER_ID: window.ENV?.GOOGLE_FOLDER_ID || '1ftA7HMju_-7pLQnvuJFNJT0_nVyZFlHc'
    },
    
    // File upload settings
    MAX_FILE_SIZE: 100 * 1024 * 1024, // 100MB (increased from 10MB)
    ACCEPTED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/heic', 'image/webp', 'image/tiff', 'image/bmp'],
    MAX_FILES: 100, // Increased from 50
    CHUNK_SIZE: 256 * 1024 // 256KB chunks for resumable uploads
};

// Application state
const AppState = {
    files: [],
    isUploading: false,
    gapi: null,
    isSignedIn: false
};

// DOM elements
const elements = {
    uploadArea: document.getElementById('uploadArea'),
    fileInput: document.getElementById('fileInput'),
    fileList: document.getElementById('fileList'),
    uploadBtn: document.getElementById('uploadBtn'),
    clearBtn: document.getElementById('clearBtn'),
    guestName: document.getElementById('guestName'),
    toast: document.getElementById('toast')
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

async function initializeApp() {
    setupEventListeners();
    await initializeGoogleAPI();
    showToast('Application ready! You can start uploading photos.', 'success');
}

// Setup event listeners
function setupEventListeners() {
    // File input
    elements.fileInput.addEventListener('change', handleFileSelect);
    
    // Upload area drag and drop
    elements.uploadArea.addEventListener('click', () => elements.fileInput.click());
    elements.uploadArea.addEventListener('dragover', handleDragOver);
    elements.uploadArea.addEventListener('dragleave', handleDragLeave);
    elements.uploadArea.addEventListener('drop', handleDrop);
    
    // Browse link
    const browseLink = document.querySelector('.browse-link');
    browseLink.addEventListener('click', (e) => {
        e.stopPropagation();
        elements.fileInput.click();
    });
    
    // Buttons
    elements.uploadBtn.addEventListener('click', handleUpload);
    elements.clearBtn.addEventListener('click', clearAllFiles);
    
    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        document.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });
}

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

// Google API initialization
async function initializeGoogleAPI() {
    try {
        // Load Google API
        await loadGoogleAPI();
        
        // Initialize the API
        await gapi.load('auth2:client', async () => {
            await gapi.client.init({
                apiKey: CONFIG.GOOGLE_DRIVE.API_KEY,
                clientId: CONFIG.GOOGLE_DRIVE.CLIENT_ID,
                discoveryDocs: [CONFIG.GOOGLE_DRIVE.DISCOVERY_DOC],
                scope: CONFIG.GOOGLE_DRIVE.SCOPES
            });
            
            AppState.gapi = gapi;
            console.log('Google API initialized successfully');
        });
    } catch (error) {
        console.error('Error initializing Google API:', error);
        showToast('Google Drive integration not available. Please check configuration.', 'error');
    }
}

function loadGoogleAPI() {
    return new Promise((resolve, reject) => {
        if (window.gapi) {
            resolve();
            return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/api.js';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// Drag and drop handlers
function handleDragOver(e) {
    elements.uploadArea.classList.add('dragover');
}

function handleDragLeave(e) {
    elements.uploadArea.classList.remove('dragover');
}

function handleDrop(e) {
    elements.uploadArea.classList.remove('dragover');
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
}

// File selection handler
function handleFileSelect(e) {
    const files = Array.from(e.target.files);
    processFiles(files);
    e.target.value = ''; // Reset input
}

// Process selected files
function processFiles(files) {
    const validFiles = files.filter(file => validateFile(file));
    
    if (validFiles.length === 0) {
        showToast('No valid image files selected.', 'error');
        return;
    }
    
    // Check total file limit
    if (AppState.files.length + validFiles.length > CONFIG.MAX_FILES) {
        showToast(`Maximum ${CONFIG.MAX_FILES} files allowed.`, 'error');
        return;
    }
    
    // Add files to state
    validFiles.forEach(file => {
        const fileData = {
            id: generateId(),
            file: file,
            name: file.name,
            size: file.size,
            progress: 0,
            status: 'pending' // pending, uploading, completed, error
        };
        AppState.files.push(fileData);
    });
    
    updateFileList();
    updateUploadButton();
    
    showToast(`${validFiles.length} file(s) added successfully.`, 'success');
}

// Validate file
function validateFile(file) {
    // Check file type
    if (!CONFIG.ACCEPTED_TYPES.includes(file.type)) {
        showToast(`${file.name}: Unsupported file type.`, 'error');
        return false;
    }
    
    // Check file size
    if (file.size > CONFIG.MAX_FILE_SIZE) {
        showToast(`${file.name}: File too large (max ${CONFIG.MAX_FILE_SIZE / 1024 / 1024}MB).`, 'error');
        return false;
    }
    
    return true;
}

// Update file list display
function updateFileList() {
    if (AppState.files.length === 0) {
        elements.fileList.classList.remove('visible');
        return;
    }
    
    elements.fileList.classList.add('visible');
    elements.fileList.innerHTML = AppState.files.map(file => createFileItem(file)).join('');
    
    // Add remove event listeners
    elements.fileList.querySelectorAll('.remove-file').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const fileId = e.target.closest('.file-item').dataset.fileId;
            removeFile(fileId);
        });
    });
}

// Create file item HTML
function createFileItem(file) {
    const sizeFormatted = formatFileSize(file.size);
    const progressVisible = file.status === 'uploading' ? 'visible' : '';
    
    return `
        <div class="file-item" data-file-id="${file.id}">
            <i class="fas fa-image file-icon"></i>
            <div class="file-info">
                <div class="file-name">${escapeHtml(file.name)}</div>
                <div class="file-size">${sizeFormatted}</div>
                <div class="file-progress ${progressVisible}">
                    <div class="progress-bar" style="width: ${file.progress}%"></div>
                </div>
            </div>
            <button class="remove-file" title="Remove file">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
}

// Remove file
function removeFile(fileId) {
    AppState.files = AppState.files.filter(file => file.id !== fileId);
    updateFileList();
    updateUploadButton();
    showToast('File removed.', 'success');
}

// Clear all files
function clearAllFiles() {
    if (AppState.isUploading) {
        showToast('Cannot clear files while uploading.', 'error');
        return;
    }
    
    AppState.files = [];
    updateFileList();
    updateUploadButton();
    showToast('All files cleared.', 'success');
}

// Update upload button state
function updateUploadButton() {
    const hasPendingFiles = AppState.files.some(file => file.status === 'pending');
    elements.uploadBtn.disabled = !hasPendingFiles || AppState.isUploading;
    
    if (AppState.isUploading) {
        elements.uploadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';
        elements.uploadBtn.classList.add('loading');
    } else {
        elements.uploadBtn.innerHTML = '<i class="fas fa-upload"></i> Upload Photos to Drive';
        elements.uploadBtn.classList.remove('loading');
    }
}

// Handle upload
async function handleUpload() {
    if (AppState.files.length === 0 || AppState.isUploading) {
        return;
    }
    
    try {
        AppState.isUploading = true;
        updateUploadButton();
        
        // Sign in to Google if not already signed in
        if (!AppState.isSignedIn) {
            await signInToGoogle();
        }
        
        const pendingFiles = AppState.files.filter(file => file.status === 'pending');
        
        showToast('Starting upload...', 'success');
        
        // Upload files sequentially to avoid overwhelming the API
        for (const fileData of pendingFiles) {
            await uploadFileToGoogleDrive(fileData);
        }
        
        showToast('All files uploaded successfully!', 'success');
        
    } catch (error) {
        console.error('Upload error:', error);
        showToast('Upload failed. Please try again.', 'error');
    } finally {
        AppState.isUploading = false;
        updateUploadButton();
    }
}

// Sign in to Google
async function signInToGoogle() {
    try {
        const authInstance = gapi.auth2.getAuthInstance();
        if (!authInstance.isSignedIn.get()) {
            await authInstance.signIn();
        }
        AppState.isSignedIn = true;
    } catch (error) {
        throw new Error('Google Sign-in failed: ' + error.message);
    }
}

// Upload file to Google Drive with resumable upload for larger files
async function uploadFileToGoogleDrive(fileData) {
    return new Promise(async (resolve, reject) => {
        fileData.status = 'uploading';
        fileData.progress = 0;
        updateFileProgress(fileData);
        
        const guestName = elements.guestName.value.trim();
        const fileName = guestName ? 
            `${guestName}_${fileData.name}` : 
            fileData.name;
        
        const metadata = {
            name: fileName,
            parents: CONFIG.GOOGLE_DRIVE.FOLDER_ID ? [CONFIG.GOOGLE_DRIVE.FOLDER_ID] : undefined
        };
        
        // Use resumable upload for files larger than 5MB
        if (fileData.file.size > 5 * 1024 * 1024) {
            try {
                await uploadFileResumable(fileData, metadata, resolve, reject);
            } catch (error) {
                fileData.status = 'error';
                updateFileProgress(fileData);
                reject(error);
            }
        } else {
            // Use simple upload for smaller files
            uploadFileSimple(fileData, metadata, resolve, reject);
        }
    });
}

// Simple upload for smaller files
function uploadFileSimple(fileData, metadata, resolve, reject) {
    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], {type: 'application/json'}));
    form.append('file', fileData.file);
    
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart');
    xhr.setRequestHeader('Authorization', 'Bearer ' + gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token);
    
    xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
            fileData.progress = Math.round((e.loaded / e.total) * 100);
            updateFileProgress(fileData);
        }
    });
    
    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
            fileData.status = 'completed';
            fileData.progress = 100;
            updateFileProgress(fileData);
            resolve();
        } else {
            fileData.status = 'error';
            updateFileProgress(fileData);
            reject(new Error('Upload failed'));
        }
    });
    
    xhr.addEventListener('error', () => {
        fileData.status = 'error';
        updateFileProgress(fileData);
        reject(new Error('Network error'));
    });
    
    xhr.send(form);
}

// Resumable upload for larger files
async function uploadFileResumable(fileData, metadata, resolve, reject) {
    try {
        // Step 1: Initiate resumable upload
        const initResponse = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(metadata)
        });
        
        if (!initResponse.ok) {
            throw new Error('Failed to initiate resumable upload');
        }
        
        const uploadUrl = initResponse.headers.get('Location');
        
        // Step 2: Upload file in chunks
        await uploadFileInChunks(fileData, uploadUrl, resolve, reject);
        
    } catch (error) {
        fileData.status = 'error';
        updateFileProgress(fileData);
        reject(error);
    }
}

// Upload file in chunks for resumable upload
async function uploadFileInChunks(fileData, uploadUrl, resolve, reject) {
    const file = fileData.file;
    const chunkSize = CONFIG.CHUNK_SIZE;
    let start = 0;
    
    while (start < file.size) {
        const end = Math.min(start + chunkSize, file.size);
        const chunk = file.slice(start, end);
        
        try {
            const response = await fetch(uploadUrl, {
                method: 'PUT',
                headers: {
                    'Content-Range': `bytes ${start}-${end - 1}/${file.size}`,
                    'Content-Length': chunk.size.toString()
                },
                body: chunk
            });
            
            if (response.status === 200 || response.status === 201) {
                // Upload complete
                fileData.status = 'completed';
                fileData.progress = 100;
                updateFileProgress(fileData);
                resolve();
                return;
            } else if (response.status === 308) {
                // Continue uploading
                start = end;
                fileData.progress = Math.round((start / file.size) * 100);
                updateFileProgress(fileData);
            } else {
                throw new Error(`Upload failed with status ${response.status}`);
            }
        } catch (error) {
            fileData.status = 'error';
            updateFileProgress(fileData);
            reject(error);
            return;
        }
    }
}

// Update file progress display
function updateFileProgress(fileData) {
    const fileItem = document.querySelector(`[data-file-id="${fileData.id}"]`);
    if (!fileItem) return;
    
    const progressContainer = fileItem.querySelector('.file-progress');
    const progressBar = fileItem.querySelector('.progress-bar');
    
    if (fileData.status === 'uploading') {
        progressContainer.classList.add('visible');
        progressBar.style.width = fileData.progress + '%';
    } else {
        progressContainer.classList.remove('visible');
        
        // Update file item appearance based on status
        if (fileData.status === 'completed') {
            fileItem.style.borderLeftColor = '#10b981';
            fileItem.querySelector('.file-icon').style.color = '#10b981';
        } else if (fileData.status === 'error') {
            fileItem.style.borderLeftColor = '#ef4444';
            fileItem.querySelector('.file-icon').style.color = '#ef4444';
        }
    }
}

// Utility functions
function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showToast(message, type = 'info') {
    elements.toast.textContent = message;
    elements.toast.className = `toast ${type}`;
    elements.toast.classList.add('show');
    
    setTimeout(() => {
        elements.toast.classList.remove('show');
    }, 4000);
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e);
    showToast('An unexpected error occurred.', 'error');
});

// Demo mode for development (remove in production)
function enableDemoMode() {
    console.log('Demo mode enabled - uploads will be simulated');
    
    // Override upload function for demo
    window.uploadFileToGoogleDrive = async function(fileData) {
        return new Promise((resolve) => {
            fileData.status = 'uploading';
            fileData.progress = 0;
            updateFileProgress(fileData);
            
            // Simulate upload progress
            const interval = setInterval(() => {
                fileData.progress += 10;
                updateFileProgress(fileData);
                
                if (fileData.progress >= 100) {
                    clearInterval(interval);
                    fileData.status = 'completed';
                    updateFileProgress(fileData);
                    resolve();
                }
            }, 200);
        });
    };
    
    window.signInToGoogle = async function() {
        AppState.isSignedIn = true;
        showToast('Demo mode: Sign-in simulated', 'success');
    };
}

// Uncomment the next line to enable demo mode for testing
// enableDemoMode();
