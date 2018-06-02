/* global gapi */
import {
  GOOGLE_API
} from '../consts';

let interval = null;

export default {
  init() {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        discoveryDocs: GOOGLE_API.DISCOVERY_DOCS,
        clientId: GOOGLE_API.CLIENT_ID,
        scope: GOOGLE_API.SCOPES
      });
    });
  },

  isGoogleLoaded() {
    return new Promise(resolve => {
      interval = setInterval(() => {
        if (typeof gapi !== 'undefined') {
          clearInterval(interval);
          resolve();
        }
      }, 1000);
    });
  },

  getMessages(label) {
    return new Promise(async resolve => {
      let response = [];

      if (typeof gapi === 'undefined') {
        await this.isGoogleLoaded();
      }

      let emails = await gapi.client.gmail.users.messages.list({
        'userId': 'me',
        'labelIds': [label],
        'maxResults': 10
      });

      emails.result.messages.forEach(async message => {
        let emailDetails = await gapi.client.gmail.users.messages.get({
          'userId': 'me',
          'id': message.id
        });
        emailDetails.result.payload.headers.forEach(header => {
          emailDetails.details = emailDetails.details || {};
          emailDetails.details[header.name.toLowerCase()] = header.value;
        });
        response.push(emailDetails);
      });

      resolve(response);

    });
  },

  getMessageDetails(id) {
    return new Promise(async resolve => {

      if (typeof gapi === 'undefined') {
        await this.isGoogleLoaded();
      }

      let emailDetail = await gapi.client.gmail.users.messages.get({
        'userId': 'me',
        'id': id
      });

      let payload = emailDetail.result.payload;

      payload.headers.forEach(header => {
        emailDetail.details = emailDetail.details || {};
        emailDetail.details[header.name.toLowerCase()] = header.value;
      });

      if (payload.body && payload.body.data) {
        payload.body.data = atob(payload.body.data.replace(/_/g, '/').replace(/-/g, '+'));
      }

      if (payload.parts) {
        payload.parts = payload.parts.map(part => {
          if (part.body.data) {
            return atob(part.body.data.replace(/_/g, '/').replace(/-/g, '+'));
          }
        });
      }

      emailDetail.result.payload = payload;

      resolve(emailDetail);
    });
  }
}