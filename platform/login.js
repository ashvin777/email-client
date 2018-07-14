const electron = require('electron');
const fs = require('./fs');
const fsReal = require('fs');
const BrowserWindow = electron.BrowserWindow;
const http = require('http');
const {
  PORT,
  CACHE,
  EVENTS
} = require('./consts');

const ipcMain = electron.ipcMain;

let loginServer = null;
let loginWindow = null;

class Login {

  init(window) {
    this.mainWindow = window;
    ipcMain.on(EVENTS.LOGIN, this.login.bind(this));
    ipcMain.on(EVENTS.TOKEN, this.onTokenReceived.bind(this));
  }

  login() {
    loginServer = http.createServer((req, res) => {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      let html = fsReal.readFileSync('./platform/login.html', 'utf8');
      res.write(html);
      res.end();
    }).listen(PORT, () => {

      loginWindow = new BrowserWindow({
        width: 600,
        height: 800,
        titleBarStyle: 'hidden'
      });

      loginWindow.loadURL(`http://localhost:${PORT}`);
      loginWindow.on('closed', () => {
        loginServer.close();
      });

    });
  }

  onTokenReceived(event, payload) {
    loginServer.close();
    loginWindow.close();
    fs.write(CACHE.TOKEN, payload);
    this.mainWindow.webContents.send(EVENTS.LOGIN);
  }
}

module.exports = new Login();