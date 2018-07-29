const electron = require('electron');
const ipcMain = electron.ipcMain;
const request = require('./request');
const parseMessage = require('gmail-api-parse-message');
const fs = require('./fs');

const MAX_THREAD_COUNT = 100;

const {
  EVENTS,
  CACHE
} = require('./consts');

class Sync {

  init(win) {
    this.mainWindow = win;
    // ipcMain.on(EVENTS.SYNC, this.startSync.bind(this));
  }

  startSync() {

    //this.loopThreads();
    this.syncLabels()
      .then(this.syncThreads.bind(this))
      .then(() => {
        console.log('threads loaded all');
        this.mainWindow.webContents.send(EVENTS.SYNC);
      });
  }

  syncLabels() {
    return new Promise(async (resolve, reject) => {
      fs.mkdir(CACHE.LABELS);

      let {
        labels
      } = await request.fetchLabels();
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

      // let totalThreads = 0;
      // let threadsLoaded = 0;
      this.loopThreads((threads) => {
        if (threads) {
          // totalThreads += threads;

          setTimeout(async () => {
            threads = await request.fetchBatch(threads, 'threads');
            console.log('thread detaiuls loaded', threads.length);
            threads.forEach(this.storeThread);
          }, 100);

        } else {
          console.log('all threads list loaded');
        }
      });
      // resolve();
    });
  }


  async loopThreads(callback) {
    let {
      threads,
      nextPageToken
    } = await request.fetchThreads({
      pageToken: this.nextPageToken || '',
      maxResults: MAX_THREAD_COUNT
    });

    this.nextPageToken = nextPageToken;

    if (threads.length < MAX_THREAD_COUNT || typeof nextPageToken === 'undefined') {
      callback();
      return;
    } else {
      console.log('.');
      callback(threads);
      setTimeout(() => {
        this.loopThreads(callback);
      }, 500);
    }
  }

  storeThread(thread) {
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
  }
}

module.exports = new Sync();