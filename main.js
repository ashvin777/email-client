const electron = require('electron');
const http = require('http');
const fs = require('fs');
const thread = require('./thread');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const loginPort = 64635;
let loginServer = null;

let win, url, loginWin;

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
  ipcMain.on('login', LoginWithGoogle);
  ipcMain.on('token', LoginTokenReceived);

  ipcMain.on('threads', () => {
    thread.list().then(res => {
      win.webContents.send('threads', res);
    });
  });
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});


function LoginWithGoogle() {
  loginServer = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    let html = fs.readFileSync('./google-login.html', 'utf8');

    res.write(html);
    res.end();
  }).listen(loginPort, () => {

    loginWin = new BrowserWindow({
      width: 600,
      height: 800,
      titleBarStyle: 'hidden'
    });

    loginWin.loadURL(`http://localhost:${loginPort}`);
    loginWin.on('closed', () => {
      loginServer.close();
    });
  });
}

function LoginTokenReceived(event, payload) {
  win.webContents.send('token', payload);
  loginServer.close();
  loginWin.close();
  fs.writeFileSync('./data/token.txt', payload, 'utf8');
}