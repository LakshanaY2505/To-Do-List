const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  // Create the browser window with widget-like properties
  mainWindow = new BrowserWindow({
    width: 450,
    height: 600,
    minWidth: 400,
    minHeight: 500,
    maxWidth: 500,
    maxHeight: 700,
    useContentSize: true,
    resizable: false, // Set to true if you want resizable widget
    frame: false, // Removes the default window frame
    alwaysOnTop: true, // Keeps widget on top of other windows
    skipTaskbar: true, // Removes from taskbar (optional)
    transparent: true, // Makes window background transparent
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
      
      
    },
    x: 100,
    y: 0
  });
  mainWindow.setBounds({
    x: 100,
    y: 0,
    width: 450,
    height: 600
  });

  // Load your HTML file
  mainWindow.loadFile('public/index.html');

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// App event handlers
app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
