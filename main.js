const { app, BrowserWindow, ipcMain } = require('electron');
const robot = require('robotjs');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200, height: 800,
    title: "Pioneer OS",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  win.loadURL('https://peerx-zeta.vercel.app');
}

app.whenReady().then(createWindow);

// Unified Command Center
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
    else if (action === 'tap') {
      robot.keyTap(key); 
    }
  } catch (e) {
    console.error("Action Failed:", e);
  }
});
