const fs = require('fs');
const request = require('request');
const TOKEN_PATH = './data/token';
const HISTORY_ID_PATH = './data/historyId';
const BASE_URL = 'https://www.googleapis.com/gmail/v1/users/me';

const API_PATH = {
  THREADS: `${BASE_URL}/threads`,
  MESSAGES: `${BASE_URL}/messages`,
  LABELS: `${BASE_URL}/labels`
};

class GoogleSync {
  constructor() {
    this.token = '';
    this.historyId = '';
    this.init();
  }

  init() {
    this.token = this.getToken();
    this.historyId = this.getHistoryId();
    if (this.token && this.token.access_token) {
      this.getThreads();
    }
  }

  getHistoryId() {
    try {
      return fs.readFileSync(HISTORY_ID_PATH, 'utf8');
    } catch (e) {
      console.log('No historyId is available')
      return '';
    }
  }

  getToken() {
    try {
      const token = fs.readFileSync(TOKEN_PATH, 'utf8');
      return JSON.parse(token);
    } catch (e) {
      console.log('Token not available')
      return '';
    }
  }

  setHistoryId(historyId) {
    try {
      fs.writeFileSync(HISTORY_ID_PATH, historyId, 'utf8');
    } catch (e) {
      console.log('Set historyId failed')
    }
  }

  getOptions(url, qs) {
    return {
      method: 'GET',
      url: url,
      qs: qs || {},
      headers: {
        Authorization: `Bearer ${this.token.access_token}`
      }
    }
  }

  getThreads() {
    //when no history is loaded
    if (!this.historyId) {
      let options = this.getOptions(API_PATH.THREADS);
      request(options, (error, res, body) => {
        body = JSON.parse(body || '');

        if (error || body.error) {
          console.error('Error loading the API data', body.error)
          return;
        };

        console.log(body.threads.length);

        if (body && body.threads instanceof Array && body.threads.length > 0) {
          this.setHistoryId(body.threads[0].historyId);

          body.threads.forEach(thread => {
            let options = this.getOptions(API_PATH.THREADS + '/' + thread.id);
            request(options, (error, res, body) => {
              body = JSON.parse(body || '');
              if (error || body.error) {
                console.error('Error loading the thread API data', body.error)
                return;
              };
              this.writeThread(body);
            });
          });
        }

      });
    }
  }

  writeThread(thread) {
    try {
      if (typeof thread === 'object') {
        let threadTemp = {};

        if (fs.existsSync(`./data/threads`) === false) {
          fs.mkdirSync(`./data/threads`);
        }

        if (fs.existsSync(`./data/threads/${thread.historyId}`) === false) {
          fs.mkdirSync(`./data/threads/${thread.historyId}`);
        }

        thread.messages.forEach(message => {
          if (typeof message === 'object') {
            fs.writeFileSync(`./data/threads/${thread.historyId}/${message.id}.json`, JSON.stringify(message), 'utf8');
          }
        });

        thread.messages = thread.messages.map(message => {
          message.headers = {};
          message.payload.headers.forEach(header => {
            message.headers[header.name] = header.value;
          });
          delete message.payload.headers;
          delete message.payload.body;
          delete message.payload.parts;
          return message;
        });

        fs.writeFileSync(`./data/threads/${thread.historyId}/thread.json`, JSON.stringify(thread), 'utf8');

        //fs.writeFileSync(`./data/threads/${thread.historyId}.json`, JSON.stringify(thread), 'utf8');
      }
    } catch (e) {
      console.log('error in file write', e);
    }
  }
}

module.exports = new GoogleSync();