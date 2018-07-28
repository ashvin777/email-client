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
    ipcMain.on(EVENTS.SEND, this.send.bind(this));

    //preparations
    fs.mkdir(CACHE.ROOT);
    fs.mkdir(CACHE.THREADS);

    // Object.keys(LABELS).forEach(index => {
    //   let label = LABELS[index];
    //   if (label === LABELS.INBOX) {
    //     Object.keys(CATEGORIES).forEach(key => {
    //       let category = CATEGORIES[key];
    //       fs.mkdir(`${CACHE.ROOT}${label}`);
    //       fs.mkdir(`${CACHE.ROOT}${label}/${category}`);
    //     });
    //   } else {
    //     fs.mkdir(`${CACHE.ROOT}${label}`);
    //   }
    // });
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

  fetchProfile(event, payload) {
    request.fetchProfile().then(res => {
      request.fetchProfileDetails(res.emailAddress).then(profile => {
        profile.data = res;
        fs.write(CACHE.PROFILE, profile);
        this.mainWindow.webContents.send(EVENTS.FETCH_PROFILE, profile);
      });
    });
  }

  fetchThreads(event, payload) {
    let options = [payload.label];
    if (payload.category) {
      options.push(payload.category);
    }

    request.fetchThreads(options).then(res => {

      if (!res.threads) {
        return;
      }

      if (payload.category) {
        fs.mkdir(`${CACHE.ROOT}${payload.label}/${payload.category}/`);
        fs.write(`${CACHE.ROOT}${payload.label}/${payload.category}/threads.json`, res);
      } else {
        fs.mkdir(`${CACHE.ROOT}${payload.label}/`);
        fs.write(`${CACHE.ROOT}${payload.label}/threads.json`, res);
      }

      res.threads.forEach(thread => {

        fs.mkdir(`${CACHE.THREADS}/${thread.id}`);
        request.fetchThreadDetails(thread.id).then(threadDetails => {
          threadDetails.messages.forEach(message => {
            fs.write(`${CACHE.THREADS}/${thread.id}/${message.id}.json`, parseMessage(message));
          });

          //cleanup
          threadDetails.messages = threadDetails.messages.map(message => {
            message = parseMessage(message);
            delete message.textPlain;
            delete message.textHtml;
            return message;
          });

          fs.write(`${CACHE.THREADS}/${thread.id}/thread.json`, threadDetails);

        });

        this.mainWindow.webContents.send(EVENTS.FETCH_THREADS);
      });
    });
  }

  encode(text) {
    return Buffer.from(text).toString('base64').replace(/\+/g, '-').replace(/\//g, '_')
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