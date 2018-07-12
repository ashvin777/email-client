const fs = require('fs');
const request = require('request');
const TOKEN_PATH = './data/token';
const HISTORY_ID_PATH = './data/historyId';
const BASE_URL = 'https://www.googleapis.com/gmail/v1/users/me';

const API_PATH = {
  THREADS: `${BASE_URL}/threads`,
  MESSAGES: `${BASE_URL}/messages`,
  LABELS: `${BASE_URL}/labels`,
  HISTORY: `${BASE_URL}/history`
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
      if (this.getHistoryId()) {
        this.getHistory();
      } else {
        this.getThreads();
      }
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
    let options = this.getOptions(API_PATH.THREADS);
    request(options, (error, res, body) => {
      body = JSON.parse(body || '');

      if (error || body.error) {
        console.error('Error loading the API data', body.error)
        return;
      };

      if (body && body.threads instanceof Array && body.threads.length > 0) {
        this.setHistoryId(body.threads[0].historyId);
        body.threads.forEach(this.getThreadDetails);
      }

    });
  }

  getThreadDetails(thread) {
    let options = this.getOptions(API_PATH.THREADS + '/' + thread.id);
    request(options, (error, res, body) => {
      body = JSON.parse(body || '');
      if (error || body.error) {
        console.error('Error loading the thread detail API data', body.error)
        return;
      };
      this.writeThread(body);
    });
  }

  getMessageDetails(message, callback) {
    let options = this.getOptions(API_PATH.MESSAGES + '/' + message.id);
    request(options, (error, res, body) => {
      body = JSON.parse(body || '');
      if (error || body.error) {
        console.error('Error loading the message API data', body.error)
        return;
      };

      callback(body);
    });
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
      }
    } catch (e) {
      console.log('error in file write', e);
    }
  }

  getHistory() {
    //when no history is loaded

    let url = `${API_PATH.HISTORY}`;
    let options = this.getOptions(API_PATH.HISTORY, {
      startHistoryId: this.getHistoryId()
    });

    request(options, (error, res, body) => {
      body = JSON.parse(body || '');
      if (error || body.error) {
        console.error('Error loading the history API data', body.error)
        return;
      };

      if (body.history) {
        console.log(body);
        this.setHistoryId(body.historyId);

        body.history.forEach(history => {

          if (fs.existsSync(`./data/threads/${history.id}`) === false) {
            fs.mkdirSync(`./data/threads/${history.id}`);
          }

          if (history.messagesAdded) {
            history.messagesAdded.forEach(message => {
              this.getThreadDetails({
                id: message.message.threadId
              });
            });
          }

          if (history.messagesDeleted) {
            history.messagesDeleted.forEach(message => {
              this.getThreadDetails({
                id: message.message.threadId
              });
            });
          }
        });

      }
    });
  }
}

module.exports = new GoogleSync();