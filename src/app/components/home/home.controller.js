/* global gapi */
import { LABELS } from '../../index.constants';

export default class HomeComponent {
  constructor($timeout, $sce) {
    'ngInject';
    this.$timeout = $timeout;
    this.emails = [];
    this.labels = LABELS;
    this.selectedEmail = {};
    this.selectedLabel = LABELS.INBOX;
    this.$sce = $sce;
    this.shadowDOM = null;

    $timeout(() => {
      if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
        this.loadMessages();
      }
    }, 2000);
  }

  $onInit() {
    this.shadowDOM = document.getElementById('email-details').attachShadow({ mode: 'open' });
  }

  login() {
    gapi.auth2.getAuthInstance().signIn().then(this.loadMessages.bind(this));
  }

  loadMessages() {
    this.emails = [];

    gapi.client.gmail.users.messages.list({
      'userId': 'me',
      'labelIds': [this.selectedLabel],
      'maxResults': 10
    }).then((response) => {
      response.result.messages.forEach(message => {
        gapi.client.gmail.users.messages.get({
          'userId': 'me',
          'id': message.id,
          'format': 'METADATA'
        }).then(res => {

          res.result.payload.headers.forEach(header => {
            res.details = res.details || {};
            res.details[header.name.toLowerCase()] = header.value;
          });

          this.$timeout(() => this.emails.push(res));
        });
      });
    });
  }

  selectEmail(email) {
    this.selectedEmail = {};

    gapi.client.gmail.users.messages.get({
      'userId': 'me',
      'id': email.result.id
    }).then(res => {

      res.result.payload.headers.forEach(header => {
        res.details = res.details || {};
        res.details[header.name.toLowerCase()] = header.value;
      });

      if (res.result.payload.body && res.result.payload.body.data) {
        res.result.payload.body.data = atob(res.result.payload.body.data.replace(/_/g, '/').replace(/-/g, '+'));
      }

      if (res.result.payload.parts) {
        res.result.payload.parts.forEach(part => {
          if (part.body.data) {
            part.body.data = this.$sce.trustAsHtml(atob(part.body.data.replace(/_/g, '/').replace(/-/g, '+')));

            this.shadowDOM.innerHTML = part.body.data;
          }
        });
      }

      this.$timeout(() => this.selectedEmail = res);
    });

  }

  selectLabel(label) {
    this.selectedLabel = label;
    this.loadMessages();
  }

  decodeBase64(str) {
      // Going backwards: from bytestream, to percent-encoding, to original string.
      return decodeURIComponent(atob(str).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  }
}