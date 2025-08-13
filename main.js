const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 600,
    alwaysOnTop: true,
    frame: false,            // no OS window borders
    transparent: true,       // allow rounded/transparent backgrounds
    webPreferences: {
      nodeIntegration: true, // allow require() in renderer
      contextIsolation: false
    }
  });

  // Load the same HTML used in browser version
  win.loadFile(path.join(__dirname, 'public', 'index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});