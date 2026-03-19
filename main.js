// main.js
const { app, BrowserWindow, ipcMain } = require('electron');
const robot = require('robotjs');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,    // Allows 'require' in the frontend
      contextIsolation: false, // Disables the security sandbox for IPC
      sandbox: false           // Crucial for RobotJS to work
    }
  });

  win.loadURL('https://peerx-zeta.vercel.app'); 
}

// THE NERVE CENTER: Listen for the Brain's signals
ipcMain.on('pioneer-cmd', (event, payload) => {
  console.log("Command Received:", payload); // Look at your terminal!
  
  if (payload.action === 'click') {
    robot.moveMouse(payload.x, payload.y);
    robot.mouseClick();
  } else if (payload.action === 'type') {
    robot.typeString(payload.text);
  }
});

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
