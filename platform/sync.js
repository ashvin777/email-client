const electron = require('electron');
const ipcMain = electron.ipcMain;
const request = require('./request');
const parseMessage = require('gmail-api-parse-message');
const fs = require('./fs');

const {
  EVENTS,
  CACHE
} = require('./consts');

class Sync {

  init(win) {
    this.mainWindow = win;
    ipcMain.on(EVENTS.SYNC, this.startSync.bind(this));
  }

  startSync() {
    this.syncLabels()
      .then(this.syncThreads.bind(this))
      .then(() => {
        console.log('threads loaded all');
        this.mainWindow.webContents.send(EVENTS.SYNC);
      });
  }

  syncLabels() {
    return new Promise(async(resolve, reject) => {
      fs.mkdir(CACHE.LABELS);

      let { labels } = await request.fetchLabels();
      labels = await request.fetchBatch(labels, 'labels');
      labels.forEach(label => {
        fs.mkdir(`${CACHE.LABELS}`);
        fs.mkdir(`${CACHE.LABELS}${label.id}`);
        fs.write(`${CACHE.LABELS}${label.id}/label.json`, label);
      });
      resolve();
    });
  }

  syncThreads() {
    return new Promise(async (resolve, reject) => {
      fs.mkdir(CACHE.THREADS);

      let { threads } = await request.fetchThreads();
      threads = await request.fetchBatch(threads, 'threads');

      threads.forEach(thread => {

        fs.mkdir(`${CACHE.THREADS}/${thread.id}`);

        if (thread && thread.messages) {
          thread.messages = thread.messages.map(message => {
            message = parseMessage(message);
            fs.write(`${CACHE.THREADS}/${thread.id}/${message.id}.json`, message);

            message.labelIds.forEach(label => {
              fs.mkdir(`${CACHE.LABELS}${label}`);
              fs.write(`${CACHE.LABELS}${label}/${thread.id}`, '');
            });
            delete message.textPlain;
            delete message.textHtml;
            return message;
          });
          fs.write(`${CACHE.THREADS}/${thread.id}/thread.json`, thread);
        }
      });

      resolve();
    });
  }
}

module.exports = new Sync();