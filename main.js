// main.js - Electron main process
const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    // Get primary display dimensions
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;

    // Create the browser window with size constraints
    mainWindow = new BrowserWindow({
        width: 350,
        height: 500,
        minWidth: 300,      // Minimum width
        minHeight: 400,     // Minimum height
        maxWidth: 600,      // Maximum width
        maxHeight: 800,     // Maximum height
        frame: false,       // Frameless window for custom design
        transparent: true,  // Transparent background
        resizable: true,    // Allow resizing within limits
        alwaysOnTop: false, // Set to true if you want it always on top
        skipTaskbar: false, // Show in taskbar
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            webSecurity: true
        },
    });

    // Load the HTML file
    mainWindow.loadFile('public/index.html');

    // Position window (optional - center it)
    const x = Math.floor((width - 350) / 2);
    const y = Math.floor((height - 500) / 2);
    mainWindow.setPosition(x, y);

    // Handle window closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

}


// App event handlers
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    // On macOS, keep app running even when all windows closed
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS, re-create window when dock icon clicked
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// Prevent navigation away from the app
app.on('web-contents-created', (event, contents) => {
    contents.on('will-navigate', (navigationEvent, url) => {
        const parsedUrl = new URL(url);
        
        if (parsedUrl.origin !== 'file://') {
            navigationEvent.preventDefault();
        }
    });
});


module.exports = { mainWindow };