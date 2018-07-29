const electron = require('electron');
const fs = require('./fs');
const login = require('./login');
const request = require('./request');
const parseMessage = require('gmail-api-parse-message');
const BrowserWindow = electron.BrowserWindow;
const MailComposer = require('nodemailer/lib/mail-composer');

const {
  EVENTS,
  CACHE,
  CATEGORIES,
  LABELS
} = require('./consts');

const ipcMain = electron.ipcMain;

class GmailSync {
  constructor() {
    this.loginServer = null;
    this.loginWindow = null;

    ipcMain.on(EVENTS.FETCH_PROFILE, this.fetchProfile.bind(this));
    ipcMain.on(EVENTS.FETCH_THREADS, this.fetchThreads.bind(this));

    ipcMain.on(EVENTS.IS_TOKEN_LOADED, this.isTokenLoaded.bind(this));
    ipcMain.on(EVENTS.FETCH_LABELS, this.fetchLabels.bind(this));
    ipcMain.on(EVENTS.SYNC, this.sync.bind(this));
    ipcMain.on(EVENTS.SEND, this.send.bind(this));

    //create require cache folder on start
    fs.mkdir(CACHE.ROOT);
    fs.mkdir(CACHE.THREADS);
    fs.mkdir(CACHE.LABELS);
  }

  init(window) {
    this.mainWindow = window;
    login.init(window);
  }

  isTokenLoaded() {
    try {
      let data = fs.read(CACHE.TOKEN);
      if (data.access_token) {
        this.mainWindow.webContents.send(EVENTS.IS_TOKEN_LOADED, data);
      } else {
        this.mainWindow.webContents.send(EVENTS.IS_TOKEN_LOADED, {
          error: true
        });
      }
    } catch (e) {
      this.mainWindow.webContents.send(EVENTS.IS_TOKEN_LOADED, {
        error: true
      });
    }
  }

  async sync() {
    Object.keys(LABELS).forEach(key => {
      let label = LABELS[key];
    })
  }

  async fetchLabels() {
    let { labels } = await request.fetchLabels();
    labels = await request.fetchBatch(labels, 'labels');
    labels.forEach(label => {
      fs.mkdir(`${CACHE.LABELS}`);
      fs.mkdir(`${CACHE.LABELS}${label.id}`);
      fs.write(`${CACHE.LABELS}${label.id}/label.json`, label);
    });
    this.mainWindow.webContents.send(EVENTS.FETCH_LABELS, labels);
  }

  async fetchProfile(event, payload) {
    let profile = await request.fetchProfile();
    profile.data = await request.fetchProfileDetails(profile.emailAddress);
    fs.write(CACHE.PROFILE, profile);
    this.mainWindow.webContents.send(EVENTS.FETCH_PROFILE, profile);
  }

  async fetchThreads(event, labelId) {
    let res = await request.fetchThreads(labelId);

    if (!res || !res.threads) {
      return;
    }

    fs.mkdir(`${CACHE.LABELS}${labelId}/`);
    fs.write(`${CACHE.LABELS}${labelId}/threads.json`, res);

    let threads = await request.fetchBatch(res.threads, 'threads');
    if (threads) {
      threads.forEach(this._storeThread);
      this.mainWindow.webContents.send(EVENTS.FETCH_THREADS + labelId);
    }
  }

  _storeThread(thread) {
    fs.mkdir(`${CACHE.THREADS}/${thread.id}`);

    if (thread && thread.messages) {
      thread.messages = thread.messages.map(message => {
        message = parseMessage(message);
        fs.write(`${CACHE.THREADS}/${thread.id}/${message.id}.json`, message);
        delete message.textPlain;
        delete message.textHtml;
        return message;
      });
      fs.write(`${CACHE.THREADS}/${thread.id}/thread.json`, thread);
    }
  }

  send(event, payload) {

    var mail = new MailComposer(payload).compile();

    mail.build((err, message) => {
      console.log(JSON.stringify(payload, message));
      let msg = Buffer.from(JSON.parse(JSON.stringify(message)).data).toString('utf8');
      // console.log(msg);
      request.send(msg).then((response) => {
        console.log('message is sent', response)
      }, err => {
        console.log('error', err, err.errors);
      });
    });
  }

}


module.exports = new GmailSync();