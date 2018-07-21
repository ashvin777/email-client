const request = require('request');
const fs = require('./fs');
const {
  CACHE
} = require('./consts');

const BASE_URL = 'https://www.googleapis.com/gmail/v1/users/me';

const API_PATH = {
  THREADS: `${BASE_URL}/threads`,
  MESSAGES: `${BASE_URL}/messages`,
  LABELS: `${BASE_URL}/labels`,
  HISTORY: `${BASE_URL}/history`,
  PROFILE: `${BASE_URL}/profile`,
  SEND: `https://www.googleapis.com/upload/gmail/v1/users/me/messages/send`,
  PROFILE_DETAILS : 'http://picasaweb.google.com/data/entry/api/user/'
};

class Request {

  getOptions(url, qs) {
    let token = this.getToken();
    return {
      method: 'GET',
      url: url,
      qs: qs || {
        maxResults: 20
      },
      headers: {
        Authorization: `Bearer ${token.access_token}`
      }
    };
  }

  getToken() {
    try {
      return fs.read(CACHE.TOKEN);
    } catch (e) {
      console.log('Token not available', e);
      return '';
    }
  }


  fetchThreads(query) {
    return new Promise((resolve, reject) => {
      let options = this.getOptions(API_PATH.THREADS);
      if (query.length > 1) {
        options.qs.q = `in:${query[0]} category:${query[1]}`;
      } else {
        options.qs.q = `in:${query[0]}`;
      }
      this.request(options, resolve, reject);
    });
  }

  fetchThreadDetails(id) {
    return new Promise((resolve, reject) => {
      let options = this.getOptions(`${API_PATH.THREADS}/${id}`);
      this.request(options, resolve, reject);
    });
  }

  fetchProfile() {
    return new Promise((resolve, reject) => {
      let options = this.getOptions(API_PATH.PROFILE);
      this.request(options, resolve, reject);
    });
  }

  fetchProfileDetails(emailAddress) {
    return new Promise((resolve, reject) => {
      let options = this.getOptions(`${API_PATH.PROFILE_DETAILS}${emailAddress}?alt=json`);
      delete options.headers;
      this.request(options, resolve, reject);
    });
  }

  send(payload) {
    return new Promise((resolve, reject) => {
      let options = this.getOptions(API_PATH.SEND);
      options.url += '?uploadType=multipart';
      options.method = 'POST';
      options.headers['Content-Type'] = 'message/rfc822';
      options.body = payload;
      this.request(options, resolve, reject);
    });
  }

  request(options, resolve, reject) {
    request(options, (error, res, body) => {
      if (error) {
        reject(error);
        return;
      }

      if (typeof body === 'string') {
        resolve(JSON.parse(body));
      } else {
        resolve(body);
      }
    });
  }

}

module.exports = new Request();