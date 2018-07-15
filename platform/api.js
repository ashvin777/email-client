const fs = require('./fs');
const electron = require('electron');
const ipcMain = electron.ipcMain;

const {
  EVENTS,
  CACHE,
  LABELS
} = require('./consts');

class API {

  constructor() {
    ipcMain.on(EVENTS.GET_PROFILE, this.getProfile.bind(this));
    ipcMain.on(EVENTS.GET_THREADS, this.getThreads.bind(this));
    ipcMain.on(EVENTS.GET_THREAD_DETAILS, this.getThreadDetails.bind(this));
  }

  init(window) {
    this.mainWindow = window;
  }

  getProfile() {
    let data = fs.read(CACHE.PROFILE);
    this.mainWindow.webContents.send(EVENTS.GET_PROFILE, data);
  }

  getThreads(event, { label, category }) {
    try {
      let url = '';
      if (label.toLowerCase() === LABELS.INBOX) {
        url = `${CACHE.ROOT}${label}/${category}/threads.json`;
      } else {
        url = `${CACHE.ROOT}${label}/threads.json`;
      }

      let data = fs.read(url);
      data.threads = data.threads.map(thread => {
        try {
          let data = fs.read(`${CACHE.THREADS}/${thread.id}/thread.json`);
          return data;
        } catch (e) {
          return {};
        }
      });

      this.mainWindow.webContents.send(EVENTS.GET_THREADS, data);
    } catch (e) {
      this.mainWindow.webContents.send(EVENTS.GET_THREADS, { });
    }
  }

  getThreadDetails(event, id) {
    try {
      let data = fs.read(`${CACHE.THREADS}/${id}/thread.json`);
      data.messages = data.messages.map(message => {
        return fs.read(`${CACHE.THREADS}/${id}/${message.id}.json`);
      });
      this.mainWindow.webContents.send(EVENTS.GET_THREAD_DETAILS, data);
    } catch (e) {
      this.mainWindow.webContents.send(EVENTS.GET_THREAD_DETAILS, { });
    }
  }
}

module.exports = new API();