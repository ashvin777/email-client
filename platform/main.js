const electron = require('electron');
// const fs = require('fs');
const Gmail = require('./gmail');
const API = require('./api');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let win, url;

if (process.env.NODE_ENV === 'DEV') {
  url = 'http://localhost:3000/';
} else {
  url = `file://${process.cwd()}/dist/index.html`;
}

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    titleBarStyle: 'hidden'
  });

  win.loadURL(url);

  Gmail.init(win);
  API.init(win);
  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-finish-launching', function () {
  //
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});