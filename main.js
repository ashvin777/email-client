const electron = require('electron');
const app = electron.app
const BrowserWindow = electron.BrowserWindow
let win, url;


//https://accounts.google.com/o/oauth2/auth?scope=https://www.google.com/m8/feeds&client_id=21302922996.apps.googleusercontent.com&redirect_uri=https://www.example.com/back&response_type=token

if (process.env.NODE_ENV === 'DEV') {
  url = 'http://localhost:64636/'
} else {
  url = `file://${process.cwd()}/dist/index.html`
}

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 1200, height: 800, titleBarStyle: 'hidden'})

  // and load the index.html of the app.
  win.loadURL(url)

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  });

}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})