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
  LABELS: `${BASE_URL}/labels`,
  BATCH: `https://www.googleapis.com/batch/gmail/v1`,
  SEND: `https://www.googleapis.com/upload/gmail/v1/users/me/messages/send`,
  PROFILE_DETAILS: 'http://picasaweb.google.com/data/entry/api/user/'
};

const BOUNDARY = 'boundary';

class Request {

  getOptions(url, qs) {
    let token = this.getToken();
    return {
      method: 'GET',
      url: url,
      qs: qs || {
        maxResults: 100
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


  fetchThreads(labelId) {
    return new Promise((resolve, reject) => {
      let options = this.getOptions(API_PATH.THREADS);
      options.qs.q = `in:${labelId}`;
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

  fetchLabels() {
    return new Promise((resolve, reject) => {
      let options = this.getOptions(API_PATH.LABELS);
      this.request(options, resolve, reject);
    });
  }

  fetchBatch(data, api) {
    return new Promise((resolve, reject) => {

      let options = this.getOptions(API_PATH.BATCH);
      options.method = 'POST';
      options.headers['Content-Type'] = `multipart/mixed; boundary=${BOUNDARY}`;
      options.body = '';
      data.forEach(item => {
        options.body += `--${BOUNDARY}\n`+
          `Content-Type: application/http\n\n`+
          `GET gmail/v1/users/me/${api}/${item.id}\n`
      });

      options.body += `--${BOUNDARY}--`;
      this.request(options, resolve, reject, true);
    });
  }

  parseBatchResponse(response) {
    // Not the same delimiter in the response as we specify ourselves in the request,
    // so we have to extract it.
    var delimiter = response.substr(0, response.indexOf('\r\n'));
    var parts = response.split(delimiter);
    // The first part will always be an empty string. Just remove it.
    parts.shift();
    // The last part will be the "--". Just remove it.
    parts.pop();

    var result = [];
    for (var i = 0; i < parts.length; i++) {
      var part = parts[i];
      var p = part.substring(part.indexOf("{"), part.lastIndexOf("}") + 1);
      result.push(JSON.parse(p));
    }
    return result;
  }

  request(options, resolve, reject, batchResponse) {
    request(options, (error, res, body) => {
      if (error) {
        reject(error);
        return;
      }

      if (batchResponse) {
        resolve(this.parseBatchResponse(body));
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