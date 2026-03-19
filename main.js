const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const robot = require('robotjs');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    title: "Pioneer OS",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // Allows Vercel to talk to RobotJS
      sandbox: false
    }
  });

  // Points to your sovereign brain on Vercel
  mainWindow.loadURL('https://peerx-zeta.vercel.app');
}

app.whenReady().then(createWindow);

// The Nerve Center: Listen for commands from the UI
ipcMain.on('pioneer-cmd', (event, payload) => {
  const { action, x, y, text, key } = payload;
  try {
    if (action === 'click') {
      if (x && y) robot.moveMouse(x, y);
      robot.mouseClick();
    } 
    else if (action === 'type') {
      robot.typeString(text);
    }
    else if (action === 'press') {
      robot.keyTap(key.toLowerCase());
    }
  } catch (e) {
    console.error("Physical Action Failed:", e);
  }
});
