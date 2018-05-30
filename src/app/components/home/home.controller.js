/* global gapi */

export default class HomeComponent {
  constructor($timeout) {
    'ngInject';
    this.$timeout = $timeout;
    this.emails = [];

    $timeout(() => {
      if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
        this.onLoginSuccess();
      }
    }, 2000);
  }

  login() {
    gapi.auth2.getAuthInstance().signIn().then(() => {
      this.onLoginSuccess();
    });
  }

  onLoginSuccess() {
    gapi.client.gmail.users.messages.list({
      'userId': 'me',
      'labelIds': ['INBOX'],
      'maxResults': 20
    }).then((response) => {
      response.result.messages.forEach(message => {
        gapi.client.gmail.users.messages.get({
          'userId': 'me',
          'id': message.id,
          'format': 'METADATA'
        }).then(res => {
          this.$timeout(() => this.emails.push(res));
        });
      });
    });
  }
}