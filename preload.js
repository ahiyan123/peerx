// preload.js
const { ipcRenderer } = require('electron');
window.pioneer = {
    send: (channel, data) => ipcRenderer.send(channel, data)
};
