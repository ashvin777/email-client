const fs = require('fs');
const {
  google
} = require('googleapis');
const nedb = require('nedb');
const request = require('request');
const db = new nedb({
  filename: './data/nedb',
  autoload: true
});

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
    this.init();
  }

  init() {
    this.token = this.getToken();
    this.getHistoryId();
    if (this.token && this.token.access_token) {
      this.getThreads();
    }
  }

  getHistoryId() {
    try {
      const token = fs.readFileSync(HISTORY_ID_PATH, 'utf8');
      return token;
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
      qs: qs || { maxResults: 20 },
      headers: {
        Authorization: `Bearer ${this.token.access_token}`
      }
    }
  }

  getThreads() {
    let options = this.getOptions(API_PATH.THREADS);

    request(options, (error, res, body) => {
      body = JSON.parse(body || '');
      if (error || body.error) {
        console.error('Error loading the API data', body.error)
        return;
      };

      if (body && body.threads instanceof Array && body.threads.length > 0) {
        this.setHistoryId(body.threads[0].historyId);
      }

      body.threads.forEach(thread => {
        //API call for each thread
        db.insert(thread, (err) => {
          let options = this.getOptions(API_PATH.THREADS + '/' + thread.id);
          request(options, (error, res, body) => {
            body = JSON.parse(body || '');
            if (error || body.error) {
              console.error('Error loading the thread API data', body.error)
              return;
            };
            db.update({id: thread.id}, body);
          });

        });

      });
    });
  }
}

module.exports = new GoogleSync();