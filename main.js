// main.js
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const robot = require('robotjs');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,    // Essential: Allows your UI to use 'require'
      contextIsolation: false, // Essential: Allows Vercel to see the Electron bridge
      sandbox: false           // Essential: Allows RobotJS to touch your mouse
    }
  });

  // Load your Sovereign Brain
  win.loadURL('https://peerx-zeta.vercel.app');
}

// THE NERVE CENTER: This listens for the "pioneer-cmd" signal from Vercel
ipcMain.on('pioneer-cmd', (event, payload) => {
  console.log("Physical command received:", payload);
  
  try {
    if (payload.action === 'click') {
      robot.moveMouse(payload.x, payload.y);
      robot.mouseClick();
    } else if (payload.action === 'type') {
      robot.typeString(payload.text);
    } else if (payload.action === 'tap') {
      robot.keyTap(payload.key);
    }
  } catch (err) {
    console.error("Hardware Execution Error:", err);
  }
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
