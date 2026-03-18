const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    title: "Pioneer OS",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // This points the desktop app to your Vercel URL
  win.loadURL('https://peerx-zeta.vercel.app');
}

app.whenReady().then(createWindow);

// The "Hands" - Allow the website to trigger mouse clicks
ipcMain.on('click-request', (event, x, y) => {
  const robot = require('robotjs');
  robot.mouseClick();
});
