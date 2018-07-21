const fs = require('./fs');
const electron = require('electron');
const ipcMain = electron.ipcMain;
const BrowserWindow = electron.BrowserWindow;
let url;

const EVENTS = {
  COMPOSE: 'compose'
};

if (process.env.NODE_ENV === 'DEV') {
  url = 'http://localhost:3000/#compose';
} else {
  url = `file://${process.cwd()}/dist/index.html#compose`;
}

class Windows {
  constructor() {
    ipcMain.on(EVENTS.COMPOSE, this.compose.bind(this));
  }

  init(win) {
    this.mainWindow = win;
  }

  compose() {
    let win = new BrowserWindow({
      width: 950,
      height: 700,
      titleBarStyle: 'hidden'
    });

    win.loadURL(url);
  }
}

module.exports = new Windows();