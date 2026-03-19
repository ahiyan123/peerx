// main.js
const { app, BrowserWindow, ipcMain } = require('electron');
const robot = require('robotjs');

function createWindow() {
 const win = new BrowserWindow({
  width: 1200,
  height: 800,
  webPreferences: {
    nodeIntegration: true,    // This enables 'require'
    contextIsolation: false, // This allows Vercel to see the 'require'
    sandbox: false,           // This lets RobotJS touch the hardware
    webSecurity: false        // Allows the bridge to Hugging Face
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
